# -*- coding:utf-8 -*-
#
#   author: iflytek
#
#  This demo is running on Windows + Python 3.7.
# The third-party libraries and their versions installed when this demo runs successfully are as follows, you can install them one by one or copy them to a new txt file and use pip to install them all at once:
#   cffi==1.12.3
#   gevent==1.4.0
#   greenlet==0.4.15
#   pycparser==2.19
#   six==1.12.0
#   websocket==0.2.1
#   websocket-client==0.56.0
#
#  Voice Evaluation Streaming WebAPI Interface Call Example Interface Documentation (must see): https://www.xfyun.cn/doc/Ise/IseAPI.html
# Error code link: https://www.xfyun.cn/document/error-code (must see when code returns error code)
# The default evaluation sample is the Chinese sentence type sample, other sample questions please go to the Demo to view the sample questions and audio examples and note that the value of the relevant evaluation parameters, go to the bottom of the platform documents to download the audio sample questions can also be
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
from builtins import Exception, str, bytes
from dotenv import load_dotenv
import os

load_dotenv()

import websocket
import datetime
import hashlib
import base64
import hmac
import json
from urllib.parse import urlencode
import time
import ssl
from wsgiref.handlers import format_date_time
from datetime import datetime
from time import mktime
import _thread as thread

STATUS_FIRST_FRAME = 0  # Identification of the first frame
STATUS_CONTINUE_FRAME = 1  # Identification of the middle frame
STATUS_LAST_FRAME = 2  # Identification of the last frame

#  BusinessArgs parameter constants
SUB = "ise"
ENT = "en"
# Chinese question type：read_syllable（Single word reading, Chinese proprietary）read_word（words reading）read_sentence（sentence reading）read_chapter(chapter reading)
# English question types：read_word（words reading）read_sentence（sentence reading）read_chapter(chapter reading)simple_expression（English situational response）read_choice（English multiple choice）topic（English free-response）retell（English retelling）picture_talk（English picture-taking）oral_translation（English oral translation）
CATEGORY = "read_sentence"
# Text to be reviewed utf8 encoded, need to add utf8bom header
TEXT = '\uFEFF' + "What's the weather like today"



# Read directly from the file
# TEXT = '\uFEFF'+ open("cn/read_sentence_cn.txt","r",encoding='utf-8').read()

class Ws_Param(object):
    # Initialization
    def __init__(self, APPID, APIKey, APISecret, AudioFile, Text):
        self.APPID = APPID
        self.APIKey = APIKey
        self.APISecret = APISecret
        self.AudioFile = AudioFile
        self.Text = Text

        # common parameter(common)
        self.CommonArgs = {"app_id": self.APPID}
        # Business parameters (business), more personalized parameters can be found on the official website
        self.BusinessArgs = {"category": CATEGORY, "sub": SUB, "ent": ENT, "cmd": "ssb", "auf": "audio/L16;rate=16000",
                             "aue": "raw", "text": self.Text, "ttp_skip": True, "aus": 1}

    # generate url
    def create_url(self):
        # wws request on Python version requirements, py3.7 can be accessed normally, if the py version of the request wss does not work, you can change to ws request, or replace the py version
        url = 'wss://ise-api-sg.xf-yun.com/v2/ise'
        #  Generate timestamps in RFC1123 format.
        now = datetime.now()
        date = format_date_time(mktime(now.timetuple()))
        # splice a string
        signature_origin = "host: " + "ise-api.xfyun.cn" + "\n"
        signature_origin += "date: " + date + "\n"
        signature_origin += "GET " + "/v2/ise " + "HTTP/1.1"
        # Encrypting with hmac-sha256
        print("signature_origin:")
        print(signature_origin)
        signature_sha = hmac.new(self.APISecret.encode('utf-8'), signature_origin.encode('utf-8'),
                                 digestmod=hashlib.sha256).digest()
        signature_sha = base64.b64encode(signature_sha).decode(encoding='utf-8')
        print("signature_sha_len: ", len(signature_sha))
        authorization_origin = "api_key=\"%s\", algorithm=\"%s\", headers=\"%s\", signature=\"%s\"" % (
            self.APIKey, "hmac-sha256", "host date request-line", signature_sha)
        authorization = base64.b64encode(authorization_origin.encode('utf-8')).decode(encoding='utf-8')

        # Combine the requested authentication parameters into a dictionary
        v = {
            "authorization": authorization,
            "date": date,
            "host": "ise-api.xfyun.cn"
        }
        # Splice the authentication parameters to generate the url
        url = url + '?' + urlencode(v)

        # This prints out the url when the connection is established, and when you refer to this demo, compare the url generated with the same parameters with the url generated by your own code.
        # print("date: ", date)
        # print("v: ", v)
        # print('websocket url :', url)
        return url


# Handling of received websocket messages
def on_message(ws, message):
    try:
        code = json.loads(message)["code"]
        sid = json.loads(message)["sid"]
        if code != 0:
            errMsg = json.loads(message)["message"]
            print("sid:%s call error:%s code is:%s" % (sid, errMsg, code))

        else:
            data = json.loads(message)["data"]
            status = data["status"]
            result = data["data"]
            if (status == 2):
                xml = base64.b64decode(result)
                # By default, python uses gbk encoding on windows, you need to do encoding conversion when you print, and other systems such as mac will adjust the encoding by themselves.
                print(xml.decode("gbk"))

    except Exception as e:
        print("receive msg,but parse exception:", e)


# Handling of websocket errors
def on_error(ws, error):
    print("### error:", error)


# Handling websocket connection establishment
def on_close(ws, close_status_code, close_msg):
    print("### closed ###")


# Handling of received websocket connection establishment
def on_open(ws):
    def run(*args):
        frameSize = 1280  # Audio size per frame
        intervel = 0.04  # Interval between transmitting audio (unit: s)
        status = STATUS_FIRST_FRAME  # Status information of the audio, identifying whether the audio is the first, intermediate, or last frame

        with open(wsParam.AudioFile, "rb") as fp:
            while True:
                buf = fp.read(frameSize)
                #  End of file
                if not buf:
                    status = STATUS_LAST_FRAME
                # First frame processing
                #  Send the first audio frame with business parameter
                # appid must be included, only the first frame should be sent
                if status == STATUS_FIRST_FRAME:
                    d = {"common": wsParam.CommonArgs,
                         "business": wsParam.BusinessArgs,
                         "data": {"status": 0}}
                    d = json.dumps(d)
                    ws.send(d)
                    status = STATUS_CONTINUE_FRAME
                # Intermediate Frame Processing
                elif status == STATUS_CONTINUE_FRAME:
                    d = {"business": {"cmd": "auw", "aus": 2, "aue": "raw"},
                         "data": {"status": 1, "data": str(base64.b64encode(buf).decode())}}
                    ws.send(json.dumps(d))
                # Last frame processing
                elif status == STATUS_LAST_FRAME:
                    d = {"business": {"cmd": "auw", "aus": 4, "aue": "raw"},
                         "data": {"status": 2, "data": str(base64.b64encode(buf).decode())}}
                    ws.send(json.dumps(d))
                    time.sleep(1)
                    break
                # Analog Audio Sample Interval
                time.sleep(intervel)
        ws.close()

    thread.start_new_thread(run, ())


if __name__ == "__main__":
    # Test it by filling in the correct information here and it will work
    time1 = datetime.now()
    # APPID, APISecret, APIKey information can be obtained in the console - Voice Evaluation (Streaming Version) - Service Interface Authentication Information.

    wsParam = Ws_Param(APPID=os.getenv('APPID'), APIKey=os.getenv('APIKey'),
                       APISecret=os.getenv('APISecret'),
                       AudioFile=os.getenv('AudioFile'), Text=os.getenv('TEXT'))
    print(os.getenv('APPID'))
    print(os.getenv('APIKey'))
    print(os.getenv('APISecret'))
    print(os.getenv('AudioFile'))
    print(os.getenv('TEXT'))
    websocket.enableTrace(False)
    wsUrl = wsParam.create_url()
    ws = websocket.WebSocketApp(wsUrl, on_message=on_message, on_error=on_error, on_close=on_close)
    ws.on_open = on_open
    ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})
    time2 = datetime.now()
    print(time2 - time1)

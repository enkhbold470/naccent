import VoiceRecorder from '@/components/VoiceRecorder';

const SpeakPage = () => {
    return (
        <div className='container mx-auto py-8'>
            <h1 className='text-2xl font-semibold text-center mb-8'>
                Pronunciation Checker
            </h1>
            <VoiceRecorder />
        </div>
    );
};

export default SpeakPage;

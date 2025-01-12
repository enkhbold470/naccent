'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface DailyContent {
    tongueTwister: string;
    phrase: string;
    movieQuote: string;
    lastUpdated: string;
}

export function DailyPractice() {
    const [content, setContent] = useState<DailyContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDailyContent() {
            try {
                const response = await fetch('/api/daily');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setContent(data);
            } catch (error) {
                console.error('Error fetching daily content:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDailyContent();
    }, []);

    const formatLastUpdated = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {content && (<span className="p-2 text-sm text-muted-foreground">
                                Updated: {formatLastUpdated(content.lastUpdated)}
                            </span>)}
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span className='text-md'>Daily Tongue Twister</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-md font-medium">{content?.tongueTwister}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle > <span className='text-md'>Daily Phrase</span></CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-md font-medium">{content?.phrase}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle > <span className='text-md'>Daily Movie Quote</span></CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-md font-medium">{content?.movieQuote}</p>
                </CardContent>
            </Card>
        </div>
    );
} 
import recommendationData from '../data/recommendations.json';

interface Irecommendation {
    type: string[],
    recommends: { title: string, suggestion: string }[]
}

export const recommendationService = {
    getCorrectRecommendation(type: string | null): { title: string, suggestion: string }[] {
        const data = recommendationData;
        if (type === null) return data.find(d => d.type.length === 0)?.recommends!;
        return data.find(d => d.type.includes(type))?.recommends ?? [];
    },

    getRecommendationsWithValue(recs: { title: string, suggestion: string }[], value: string, regex: string = 'change'): { title: string, suggestion: string }[] {
        console.log(recs);
        if (recs.length == 0) return [];
        const reg = new RegExp("\\${" + regex + "}", "g");
        return recs.map(r => { return { ...r, suggestion: r.suggestion.replace(reg, value) } });
    }
};
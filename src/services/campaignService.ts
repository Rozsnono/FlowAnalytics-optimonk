import campaignData from '../data/campaigns.json';

interface Icampaign {
    id: string,
    name: string,
    device: "desktop" | "mobile",
    steps: Istep[]
}

interface Istep {
    "id": string,
    "name": string,
    "type": string,
    "views": number,
    "proceeds": number,
    "description": string
}


export const campaignService = {
    getCampaigns(): Icampaign[] {
        return campaignData.campaigns as Icampaign[];
    },

    getOverallConversion(campaign: Icampaign) {
        if (!campaign.steps || campaign.steps.length === 0) return 0;
        const firstStep = campaign.steps[0]!;
        const lastStep = campaign.steps[campaign.steps.length - 1]!;
        return firstStep.views > 0
            ? ((lastStep.proceeds / firstStep.views) * 100).toFixed(1)
            : 0;
    },

    processStepMetrics(steps: Istep[]) {
        if (!steps || steps.length === 0) return [];
        const firstStepViews = steps[0]!.views || 1;

        return steps.map((step, index) => {
            const dropOffCount = step.views - step.proceeds;
            const dropOffRate = step.views > 0 ? (dropOffCount / step.views) * 100 : 0;
            const conversionRate = step.views > 0 ? (step.proceeds / step.views) * 100 : 0;
            const relativeWidth = (step.views / firstStepViews) * 100;
            const nextWidth = relativeWidth * (conversionRate / 100);

            return {
                ...step,
                index,
                dropOffCount,
                dropOffRate,
                conversionRate,
                relativeWidth,
                nextWidth
            };
        });
    },

    findWorstStep(steps: Istep[]) {
        const enrichedSteps = this.processStepMetrics(steps);
        if (enrichedSteps.length === 0) return null;

        return enrichedSteps.reduce((worst, current) => {
            return (worst.dropOffRate > current.dropOffRate) ? worst : current;
        });
    },

    filterCampaigns(device: 'mobile' | 'desktop' | 'all') {
        if (device == 'all') return campaignData.campaigns;
        return campaignData.campaigns.filter((f) => f.device == device);
    },

    getCampaignById(id: string) {
        return campaignData.campaigns.find(f => f.id == id);
    }
};
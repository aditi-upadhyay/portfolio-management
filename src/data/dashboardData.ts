export const heroContent = {
    title: "Welcome to Capitalmind Premium",
    description: "Track your portfolio performance, analyze returns, and make informed investment decisions with our comprehensive analytics dashboard."
};

export const statsData = [
    { title: "Get started", content: "Read our getting started guide to get the most out of Capitalmind Premium" },
    { title: "Community", content: "Join the conversation on our exclusive community on Slack for Capitalmind premium users" },
    { title: "Visit Website", content: "Keep up with our latest content on our website" },
];

export interface BlogPost {
    id: number;
    title: string;
    date: string;
    category: string;
    description: string;
    link: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
        date: "Apr 18, 2024",
        category: "Market Update",
        description: "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration",
        link: "#"
    },
    {
        id: 2,
        title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
        date: "Apr 05, 2024",
        category: "Analysis",
        description: "Unlock this post by trail. Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation",
        link: "#"
    },
    {
        id: 3,
        title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
        date: "Apr 03, 2024",
        category: "Education",
        description: "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months",
        link: "#"
    },
    {
        id: 4,
        title: "A Small CAD for India, Yet Again",
        date: "Mar 27, 2024",
        category: "News",
        description: "Yet again, India's Current Account Deficit is a mere 10 bn in the quarter (Dec 2023), less than levels more than a decade back, and less than 2017-18 too. Why not of gold? It's not really",
        link: "#"
    }
];

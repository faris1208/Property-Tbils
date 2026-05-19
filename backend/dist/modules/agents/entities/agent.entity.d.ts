import { User } from '../../auth/entities/user.entity';
export declare enum AgentTier {
    FREE = "free",
    PRO = "pro",
    PREMIUM = "premium"
}
export declare class Agent {
    id: string;
    userId: string;
    user: User;
    agencyName: string;
    bio: string;
    whatsapp: string;
    phone: string;
    isVerified: boolean;
    tier: AgentTier;
    createdAt: Date;
    updatedAt: Date;
}

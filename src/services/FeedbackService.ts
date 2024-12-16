import { supabase } from "../supabaseClient";

export type FeedbackCounts = { thumbs_up: number; thumbs_down: number };

export class FeedbackService {
    // Fetch feedback counts
    static async getCounts(): Promise<FeedbackCounts> {
        const { data, error } = await supabase
            .from("feedback")
            .select("type, count");

        if (error) {
            console.error("Error fetching feedback counts:", error);
            return { thumbs_up: 0, thumbs_down: 0 };
        }

        const counts: FeedbackCounts = { thumbs_up: 0, thumbs_down: 0 };

        for (const row of data) {
            counts[row.type as keyof FeedbackCounts] = row.count;
        }

        return counts;
    }

    // Increment feedback count via RPC (Remote Procedure Call)
    static async incrementFeedback(type: "thumbs_up" | "thumbs_down"): Promise<void> {
        const { error } = await supabase.rpc("increment_feedback_count", { feedback_type: type });

        if (error) {
            console.error("Error incrementing feedback count:", error);
            throw new Error("Failed to increment feedback");
        }
    }
}

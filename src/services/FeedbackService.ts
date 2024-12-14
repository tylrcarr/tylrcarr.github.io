import { supabase } from "../supabaseClient";

export type FeedbackCounts = { thumbs_up: number; thumbs_down: number };

export class FeedbackService {
    // Get feedback counts
    static async getCounts(): Promise<FeedbackCounts> {
        const { data, error } = await supabase.from("feedback_counts").select("*");

        if (error) {
            console.error("Error fetching feedback counts:", error);
            return { thumbs_up: 0, thumbs_down: 0 };
        }

        const counts: FeedbackCounts = { thumbs_up: 0, thumbs_down: 0 };

        for (const row of data) {
            counts[row.feedback_type as "thumbs_up" | "thumbs_down"] = row.count;
        }

        return counts;
    }

    // Submit feedback
    static async submit(type: "thumbs_up" | "thumbs_down"): Promise<void> {
        const { error } = await supabase.from("feedback").insert([{ feedback_type: type }]);
        if (error) {
            console.error("Error inserting feedback:", error);
            throw new Error("Failed to submit feedback");
        }
    }
}

// ----- Supabase Service -----
import {SandboxItem} from "../types/Sandbox";
import {supabase} from "../supabaseClient";

export const SandboxService = {
    async fetchItems(): Promise<SandboxItem[]> {
        const {data} = await supabase.from('sandbox_items').select('*');
        return data || [];
    },
    async addNote() {
        const {data} = await supabase
            .from('sandbox_items')
            .insert([{type: 'note', content: {text: ''}, x: 50, y: 50}])
            .select();
        return data?.[0];
    },
    async uploadImage(file: File) {
        const bucketName = 'tylrcarr'; // Ensure this matches the bucket you created
        const filePath = `images/${Date.now()}_${file.name}`;

        const {error} = await supabase
            .storage
            .from(bucketName)
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }

        // Retrieve public URL
        const {data} = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        const publicUrl = data.publicUrl;

        // Save to sandbox_items table
        const {data: insertedData} = await supabase
            .from('sandbox_items')
            .insert([{type: 'image', content: {url: publicUrl}, x: 100, y: 100}])
            .select();

        return insertedData?.[0];
    },
    async saveDrawing(url: string) {
        const {data} = await supabase
            .from('sandbox_items')
            .insert([{type: 'drawing', content: {url}, x: 0, y: 0}])
            .select();
        return data?.[0];
    },
    async updateItem(id: string, updates: Partial<SandboxItem>) {
        await supabase.from('sandbox_items').update(updates).eq('id', id);
    },
    async deleteItem(id: string): Promise<boolean> {
        const {error} = await supabase.from('sandbox_items').delete().eq('id', id);
        if (error) {
            console.error('Error deleting item:', error);
            return false;
        }
        return true;
    },

};
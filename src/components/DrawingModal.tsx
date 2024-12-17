import React, {useEffect, useRef} from 'react';
import {Button, Dialog, DialogActions, DialogContent, useTheme} from '@mui/material';
import * as fabric from 'fabric';

type DrawingModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
}

export const DrawingModal: React.FC<DrawingModalProps> = ({open, onClose, onSave}) => {
    const theme = useTheme();
    const canvasRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        if (open) {
            canvasRef.current = new fabric.Canvas('drawing-modal-canvas', {
                backgroundColor: theme.palette.background.paper,
                width: window.innerWidth - 50,
                height: window.innerHeight - 150,
            });

            // Cleanup canvas safely
            return () => {
                if (canvasRef.current) {
                    canvasRef.current.dispose();
                    canvasRef.current = null; // Nullify the reference
                }
            };
        }
    }, [open, theme.palette.background.paper]);


    const handleSave = () => {
        const url = canvasRef.current?.toDataURL();
        if (url) onSave(url);
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogContent sx={{padding: 0, backgroundColor: theme.palette.background.default}}>
                <canvas id="drawing-modal-canvas"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Save
                </Button>
                <Button onClick={onClose} color="secondary" variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};


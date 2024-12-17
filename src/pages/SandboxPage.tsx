import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, IconButton, TextField, useTheme} from '@mui/material';
import {Delete, Upload} from '@mui/icons-material';
import Draggable from 'react-draggable';
import * as fabric from 'fabric';
import {SandboxItem} from '../types/Sandbox';
import {SandboxService} from '../services/SandboxService';

const SandboxPage: React.FC = () => {
    const theme = useTheme();
    const [items, setItems] = useState<SandboxItem[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const canvasRef = useRef<fabric.Canvas | null>(null);
    const modalCanvasRef = useRef<fabric.Canvas | null>(null);

    // Fetch all items on load
    useEffect(() => {
        SandboxService.fetchItems().then(setItems);
        const canvas = new fabric.Canvas('drawing-canvas', {isDrawingMode: false});
        canvasRef.current = canvas;
    }, []);

    // Add Note
    const handleAddNote = async () => {
        const newItem = await SandboxService.addNote();
        if (newItem) setItems((prev) => [...prev, newItem]);
    };

    // Upload Image
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const newItem = await SandboxService.uploadImage(file);
        if (newItem) setItems((prev) => [...prev, newItem]);
    };

    // Toggle Drawing Mode
    const toggleDrawing = () => {
        setIsDrawing((prev) => !prev);
        if (!canvasRef.current) return;
        canvasRef.current.isDrawingMode = !isDrawing;
    };

    // Save Drawing
    const saveDrawing = async () => {
        const url = canvasRef.current?.toDataURL();
        if (url) {
            const newItem = await SandboxService.saveDrawing(url);
            if (newItem) setItems((prev) => [...prev, newItem]);
            canvasRef.current?.clear();
        }
    };

    // Full-Screen Drawing Modal Handlers
    const handleOpenModal = () => {
        setIsModalOpen(true);
        setTimeout(() => {
            const modalCanvas = new fabric.Canvas('modal-drawing-canvas', {
                backgroundColor: theme.palette.background.paper,
                width: window.innerWidth - 50,
                height: window.innerHeight - 150,
            });
            modalCanvasRef.current = modalCanvas;
        }, 100);
    };

    const handleCloseModal = () => {
        modalCanvasRef.current?.dispose();
        setIsModalOpen(false);
    };

    const handleSaveModalDrawing = async () => {
        const url = modalCanvasRef.current?.toDataURL();
        if (url) {
            const newItem = await SandboxService.saveDrawing(url);
            if (newItem) setItems((prev) => [...prev, newItem]);
            modalCanvasRef.current?.clear();
        }
        handleCloseModal();
    };

    return (
        <Box sx={{padding: theme.spacing(2), position: 'relative'}}>
            {/* Toolbar */}
            <Box sx={{display: 'flex', gap: theme.spacing(2), marginBottom: theme.spacing(2)}}>
                <Button variant="contained" onClick={handleAddNote}>
                    Add Note
                </Button>
                <Button variant="contained" onClick={toggleDrawing}>
                    {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
                </Button>
                <Button variant="contained" onClick={saveDrawing}>
                    Save Drawing
                </Button>
                <Button variant="contained" onClick={handleOpenModal}>
                    Open Full-Screen Drawing
                </Button>
                <label htmlFor="upload-image">
                    <input
                        id="upload-image"
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={handleImageUpload}
                    />
                    <Button component="span" variant="contained" startIcon={<Upload/>}>
                        Upload Image
                    </Button>
                </label>
            </Box>

            {/* Drawing Canvas */}
            {isDrawing && (
                <Box
                    sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        marginBottom: theme.spacing(2),
                    }}
                >
                    <canvas id="drawing-canvas" width="800" height="400"/>
                </Box>
            )}

            {/* Sandbox Items */}
            {items.map((item) => (
                <Draggable
                    key={item.id}
                    defaultPosition={{x: item.x, y: item.y}}
                    onStop={(e, data) => {
                        void SandboxService.updateItem(item.id, {x: data.x, y: data.y});
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            padding: theme.spacing(2),
                            backgroundColor:
                                item.type === 'note'
                                    ? theme.palette.secondary.light
                                    : theme.palette.background.paper,
                            boxShadow: theme.shadows[2],
                            borderRadius: theme.shape.borderRadius,
                            maxWidth: 200,
                        }}
                    >
                        {/* Notes */}
                        {item.type === 'note' && (
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                defaultValue={item.content.text}
                                onBlur={(e) =>
                                    SandboxService.updateItem(item.id, {content: {text: e.target.value}})
                                }
                                InputProps={{
                                    style: {
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                    },
                                }}
                            />
                        )}

                        {/* Images */}
                        {item.type === 'image' && (
                            <img
                                src={item.content.url}
                                alt="Uploaded"
                                style={{width: '100%', borderRadius: theme.shape.borderRadius}}
                            />
                        )}

                        {/* Delete Button */}
                        <IconButton
                            onClick={async () => {
                                const success = await SandboxService.deleteItem(item.id);
                                if (success) {
                                    setItems((prev) => prev.filter((i) => i.id !== item.id));
                                }
                            }}
                            sx={{
                                color: theme.palette.error.main,
                            }}
                        >
                            <Delete/>
                        </IconButton>
                    </Box>
                </Draggable>
            ))}

            {/* Full-Screen Drawing Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} fullScreen>
                <DialogContent sx={{padding: 0, backgroundColor: theme.palette.background.default}}>
                    <canvas id="modal-drawing-canvas"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveModalDrawing} variant="contained" color="primary">
                        Save
                    </Button>
                    <Button onClick={handleCloseModal} variant="outlined" color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SandboxPage;

import React, { useCallback, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    useTheme,
    TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";

export type GeneratedImage = {
    height: number;
    width: number;
    content: string;
    author: string;
};

type DrawingModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (image: GeneratedImage) => void;
};

export const DrawingModal: React.FC<DrawingModalProps> = ({
                                                              open,
                                                              onClose,
                                                              onSave,
                                                          }) => {
    const theme = useTheme();

    // Steps: "choose" → "editing" → "preview"
    const [step, setStep] = useState<"choose" | "editing" | "preview">("choose");
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [confirmClearOpen, setConfirmClearOpen] = useState<boolean>(false);
    // Store image data without the author; we'll add that just before saving.
    const [drawingToSave, setDrawingToSave] = useState<
        Omit<GeneratedImage, "author"> | null
    >(null);
    const [author, setAuthor] = useState<string>("anonymous");

    // Dropzone handler
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
                setStep("editing");
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const onClear = () => {
        setImageSrc(null);
        setEditedImage(null);
        setStep("choose");
        setConfirmClearOpen(false);
        setDrawingToSave(null);
        setAuthor("anonymous");
    };

    const handleSave = () => {
        if (drawingToSave) {
            onSave({
                ...drawingToSave,
                author,
            });
            onClose();
            onClear();
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} disableEscapeKeyDown fullScreen>
                <DialogContent
                    sx={{
                        padding: 0,
                        backgroundColor: theme.palette.background.default,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    {/* STEP 1: Choose Option */}
                    {step === "choose" && (
                        <Box textAlign="center">
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ margin: 1 }}
                                onClick={() => {
                                    setImageSrc("https://placehold.co/600x600/ffffff/ffffff/png");
                                    setStep("editing");
                                }}
                            >
                                Use Blank Canvas
                            </Button>
                            <Typography variant="h6" color="textSecondary">
                                or
                            </Typography>
                            <div
                                {...getRootProps()}
                                style={{
                                    width: "80vw",
                                    height: "20vh",
                                    border: "2px dashed gray",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                <input {...getInputProps()} />
                                <p>Drag & Drop an image or click to upload</p>
                            </div>
                        </Box>
                    )}

                    {/* Render Editor if imageSrc is set */}
                    {imageSrc && (
                        <div style={{ width: "100vw", height: "100%" }}>
                            <FilerobotImageEditor
                                savingPixelRatio={4}
                                previewPixelRatio={window.devicePixelRatio}
                                source={imageSrc}
                                onBeforeSave={() => false}
                                onSave={(savedImageData) => {
                                    if (
                                        savedImageData.imageBase64 &&
                                        savedImageData.height &&
                                        savedImageData.width
                                    ) {
                                        setEditedImage(savedImageData.imageBase64);
                                        setDrawingToSave({
                                            content: savedImageData.imageBase64,
                                            height: savedImageData.height,
                                            width: savedImageData.width,
                                        });
                                        setStep("preview");
                                    }
                                }}
                                tabsIds={Object.values(TABS)}
                                defaultTabId={TABS.ANNOTATE}
                                defaultToolId={TOOLS.PEN}
                            />
                        </div>
                    )}

                    {/* Preview Modal Overlay */}
                    {step === "preview" && editedImage && (
                        <Dialog open={true} onClose={() => {}} maxWidth="sm" fullWidth>
                            <DialogTitle>
                                Preview - Images will be resized to 200px on longest side
                            </DialogTitle>
                            <DialogContent
                                sx={{ textAlign: "center", justifyContent: "center" }}
                            >
                                <img
                                    src={editedImage}
                                    alt="Preview"
                                    style={{
                                        maxWidth: "200px",
                                        maxHeight: "200px",
                                        margin: "auto",
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                                <TextField
                                    label="Author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => setStep("editing")}
                                    variant="contained"
                                    color="primary"
                                >
                                    Keep Editing
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </DialogContent>

                <DialogActions>
                    {imageSrc && (
                        <Button
                            onClick={() => setConfirmClearOpen(true)}
                            variant="contained"
                            color="primary"
                        >
                            Clear
                        </Button>
                    )}
                    {step !== "preview" && (
                        <Button onClick={onClose} color="secondary" variant="outlined">
                            Close
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            <Dialog
                open={confirmClearOpen}
                onClose={() => setConfirmClearOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    Are you sure you want to clear the current image? This cannot be undone.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onClear} color="primary" variant="contained">
                        Yes
                    </Button>
                    <Button onClick={() => setConfirmClearOpen(false)} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

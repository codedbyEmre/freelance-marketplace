"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { HireFormData } from "../types/freelancer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HireFreelancerModalProps {
  open: boolean;
  onClose: () => void;
  freelancerName: string;
}

export default function HireFreelancerModal({
  open,
  onClose,
  freelancerName,
}: HireFreelancerModalProps) {
  const [formData, setFormData] = useState<HireFormData>({
    name: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Hiring request sent successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setFormData({ name: "", subject: "", message: "" });
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: 24, paddingBottom: 0 }}>
          Hire {freelancerName}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                fullWidth
              />
              <TextField
                label="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                fullWidth
              />
              <TextField
                label="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ marginRight: 2, paddingBottom: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ToastContainer />
    </>
  );
}

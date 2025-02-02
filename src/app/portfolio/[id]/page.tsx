"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchJobs, fetchComments } from "../../../store/freelancerSlice";
import {
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import HireFreelancerModal from "../../../components/HireFreelancerModal";
import { Comment, Job } from "../../../types/freelancer";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PortfolioPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const dispatch = useAppDispatch();
  const freelancerId = parseInt(resolvedParams.id);
  const freelancer = useAppSelector((state) =>
    state.freelancer.freelancers.find((f) => f.id === freelancerId)
  );
  const jobs = useAppSelector((state) =>
    state.freelancer.jobs.filter((job) => job.userId === freelancerId)
  );
  const comments = useAppSelector((state) => state.freelancer.comments);

  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleShowComments = async (jobId: number) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
      dispatch(fetchComments(jobId));
    }
  };

  if (!freelancer) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            src={`https://i.pravatar.cc/150?u=${freelancer.id}`}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {freelancer.name}
            </Typography>
            <Typography color="text.secondary">{freelancer.email}</Typography>
            <Typography color="text.secondary">{freelancer.phone}</Typography>
            <Typography color="text.secondary">
              {freelancer.address.city}, {freelancer.address.zipcode}
            </Typography>
            <Typography color="text.secondary">
              Website: {freelancer.website}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsHireModalOpen(true)}
        >
          Hire Freelancer
        </Button>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Past Jobs ({jobs.length})
      </Typography>

      {jobs.map((job: Job) => (
        <Card key={job.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{job.title}</Typography>
            <Typography color="text.secondary">{job.body}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleShowComments(job.id)}>
              {expandedJob === job.id ? "Hide Comments" : "Show Comments"}
            </Button>
          </CardActions>
          <Collapse in={expandedJob === job.id}>
            <CardContent>
              <List>
                {comments
                  .filter((comment: Comment) => comment.postId === job.id)
                  .map((comment: Comment) => (
                    <ListItem key={`${job.id}-${comment.id}`} divider>
                      <ListItemText
                        primary={comment.name}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment.email}
                            </Typography>
                            {" — "}
                            {comment.body}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Collapse>
        </Card>
      ))}

      <HireFreelancerModal
        open={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        freelancerName={freelancer.name}
      />
    </Container>
  );
}

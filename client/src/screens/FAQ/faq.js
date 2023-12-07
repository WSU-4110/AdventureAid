import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import Navbar from '../../components/navbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './faq.scss'



function FAQ() {
  return (
    <Container maxWidth={false} className='home-container'>
            <Grid container direction="column" spacing={4}>
                <Grid item mt="1rem">
                    <Navbar />
                </Grid>
                <Grid item>
                    <Box>
                        <Typography variant="body1" className="hero-text">
                            Frequently Asked Questions
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    {/* FAQ Items */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>How does AdventureAid help me plan my trip?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                               AdventureAid offers comprehensive trip planning tools including destination recommendations, itinerary planning, accommodation booking, and travel advice. Our platform is designed to simplify your travel planning process, making it easier and more enjoyable.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                   <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Can I book flights and hotels through AdventureAid?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>
                            Yes, AdventureAid partners with various airlines and hotel chains to provide you with a wide range of booking options. You can compare prices, check availability, and book flights and hotels directly through our platform.
                           </Typography>
                        </AccordionDetails>
                    </Accordion>


                       <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>What are the best destinations for solo travelers?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>
                            Popular destinations for solo travelers include Japan, New Zealand, Portugal, and Costa Rica. These countries are known for their friendly locals, safe environments, and well-established tourist infrastructures.
                           </Typography>
                        </AccordionDetails>
                    </Accordion>



                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>How does AdventureAid protect my personal and payment information?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>
                           We take your privacy seriously at AdventureAid. All personal and payment information is encrypted and securely stored. We comply with the latest data protection regulations to ensure that your information is safe and never shared without your consent.
                            </Typography>
                    </AccordionDetails>
                    </Accordion>



                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>How can I get in touch with customer support?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>
                            We recommend following all local health guidelines, including wearing masks, practicing social distancing, and sanitizing hands regularly. Always check travel advisories and restrictions for your destination before planning your trip.
                            </Typography>
                    </AccordionDetails>
                    </Accordion>






                    

                </Grid>
            </Grid>
        </Container>
  );
}


export default FAQ;
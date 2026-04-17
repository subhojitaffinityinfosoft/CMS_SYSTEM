import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, DollarSign, Clock, Briefcase, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DcryptText, EncryptText } from "@/lib/Storage";
import CallApi from "@/services/dbIntr";
import { useNavigate } from "react-router-dom";
import { JOBPOST } from "@/model/Api";
import { sanitizeHTML } from "@/lib/utils";
import technoindiaGrpLogo from '../../assets/technoIndiaGrpLogo.png'
export function JobApplicationPage() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");
    const params = useParams()
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
    });
    const [jobDetails, setJobdtls] = useState()
    // const jobDetails = {
    //     title: "Senior Frontend Developer",
    //     company: "TechCorp Industries",
    //     location: "San Francisco, CA (Hybrid)",
    //     salary: "$120k - $160k",
    //     type: "Full-time",
    //     posted: "2 days ago",
    //     skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Git"],
    //     description: "We are looking for an experienced Frontend Developer to join our growing team. You'll be working on cutting-edge web applications using modern technologies and frameworks.",
    //     responsibilities: [
    //         "Build and maintain high-quality web applications using React and TypeScript",
    //         "Collaborate with designers and backend developers to create seamless user experiences",
    //         "Write clean, maintainable, and well-documented code",
    //         "Participate in code reviews and contribute to team knowledge sharing",
    //         "Optimize applications for maximum speed and scalability",
    //     ],
    //     requirements: [
    //         "5+ years of experience in frontend development",
    //         "Strong proficiency in React, TypeScript, and modern CSS frameworks",
    //         "Experience with state management libraries (Redux, Zustand, etc.)",
    //         "Understanding of RESTful APIs and asynchronous programming",
    //         "Excellent problem-solving and communication skills",
    //     ],
    //     benefits: [
    //         "Competitive salary and equity package",
    //         "Health, dental, and vision insurance",
    //         "Flexible work schedule and remote options",
    //         "Professional development budget",
    //         "Team building events and company retreats",
    //     ],
    // };

    const handleApplyClick = () => {
        window.open(`/candidate-apply/${params?.jobId}`, "_blank");
    };


    // const geyById = async (reqId) => {
    //     const payload = {
    //         "jobPublishToken": reqId
    //     }
    //     const response = await CallApi(1, JOBPOST.getjobdetailsbytoken, payload);
    //     if (response.request.status == 200 && response.data.data) if (response?.data?.isValid) {
    //         setJobdtls(response.data.data)
    //     }
    // };

    const geyById = async (reqId) => {
        const payload = {
            "jobPublishToken": reqId
        };
        const response = await CallApi(1, JOBPOST.getjobdetailsbytoken, payload);

        // Check for successful API response and valid data
        if (response.request.status === 200 && response.data.data) {
            if (response?.data?.isValid) {
                setJobdtls(response.data.data);
                setErrorMessage(""); // Clear any previous error message
            } else {
                setJobdtls(null);
                setErrorMessage(response.data?.errorMsg || "Job details are not available."); // Display API error message
            }
        } else {
            console.log(response)
            setJobdtls(null);
            setErrorMessage(response.data?.errorMsg || "Failed to load job details. Please try again later.");
        }
    };


    useEffect(() => {
        console.log(DcryptText((params.jobId)))
        if (DcryptText(params?.jobId)) {
            geyById(DcryptText(params?.jobId))
        }
    }, [params])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl mx-auto">
                {/* Greeting Section */}
                <div className="mb-8 flex items-center gap-4 bg-slate-50 p-4 rounded-xl shadow-sm">
                    <img
                        src={technoindiaGrpLogo}
                        alt="Techno India Group Logo"
                        className="w-16"
                    />

                    <div>
                        <h1 className="text-slate-900 text-xl font-bold">
                            Welcome to Techno India Group!
                        </h1>
                        <p className="text-slate-600 text-sm">
                            Explore the opportunities waiting for you.
                        </p>
                    </div>
                </div>




                {errorMessage ? (
                    <div className="mb-8 p-4 bg-red-100 text-red-800 rounded-xl">
                        <p>{errorMessage}</p>
                    </div>
                ) : (
                    jobDetails && (
                        <Card className="shadow-lg border-slate-200">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-slate-900 mb-2">{jobDetails?.jobTitle}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 text-slate-600">
                                            <Building2 className="h-4 w-4" />
                                            {jobDetails?.unitName}
                                        </CardDescription>
                                    </div>
                                    <Button onClick={handleApplyClick} size="lg" className="sm:ml-auto">
                                        Apply Now
                                    </Button>
                                </div>

                                {/* <div className="flex flex-wrap gap-4 mt-4 text-slate-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{jobDetails?.unitName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{jobDetails?.proposedSalary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>{jobDetails?.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{jobDetails?.openDate}-{jobDetails?.closeDate}</span>
                            </div>
                        </div> */}

                                {/* <div className="flex flex-wrap gap-2 mt-4">
                            {jobDetails?.skills.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div> */}
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-slate-900 mb-3">About the Role</h3>
                                    <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: sanitizeHTML(jobDetails?.description) }} />
                                </div>

                                {/* <Separator /> */}

                                {/* <div>
                            <h3 className="text-slate-900 mb-3">Key Responsibilities</h3>
                            <ul className="space-y-2">
                                {jobDetails?.responsibilities.map((item, index) => (
                                    <li key={index} className="flex gap-2 text-slate-600">
                                        <span className="text-slate-400 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                                {/* <Separator /> */}

                                {/* <div>
                            <h3 className="text-slate-900 mb-3">Requirements</h3>
                            <ul className="space-y-2">
                                {jobDetails?.requirements.map((item, index) => (
                                    <li key={index} className="flex gap-2 text-slate-600">
                                        <span className="text-slate-400 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                                {/* <Separator /> */}

                                {/* <div>
                            <h3 className="text-slate-900 mb-3">Benefits</h3>
                            <ul className="space-y-2">
                                {jobDetails?.benefits.map((item, index) => (
                                    <li key={index} className="flex gap-2 text-slate-600">
                                        <span className="text-slate-400 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                                <div className="pt-6">
                                    <Button onClick={handleApplyClick} size="lg" className="w-full sm:w-auto">
                                        Apply Now
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>))}
            </div>
        </div>
    );
}

export default JobApplicationPage 

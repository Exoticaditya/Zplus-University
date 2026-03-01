// Zpluse University MVP Data Structure
// Mapping images w5-w13 to top universities

const UNIVERSITIES = [
    {
        id: 1,
        name: "IIT Bombay",
        fullName: "Indian Institute of Technology Bombay",
        location: "Mumbai, Maharashtra",
        city: "Mumbai",
        rating: 4.8,
        reviews: 2547,
        totalFees: "₹8.5 Lakh (4 years)",
        yearlyFee: "₹2.12 Lakh/year",
        established: 1958,
        stream: "Engineering",
        tags: ["Public", "Research-based", "Top Ranked"],
        type: "Government",
        heroImage: "assets/w5.jpeg",
        gallery: ["assets/w5.jpeg", "assets/w4.jpeg"],
        about: "IIT Bombay is India's premier engineering and research institution, consistently ranked #1 in NIRF rankings. Known for excellence in technology education, groundbreaking research, and strong industry connections.",
        campusFacilities: [
            "200+ Research Labs",
            "World-class Library with 4 lakh+ books",
            "Sports Complex with Olympic facilities",
            "24/7 High-speed Internet",
            "Modern Hostels for 8000+ students"
        ],
        placementStats: {
            averagePackage: "₹18.9 LPA",
            highestPackage: "₹2.01 Crore",
            placementRate: "100%",
            topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey"]
        },
        
        // The USP: Learning Hub
        notes: [
            {
                id: 1,
                title: "Data Structures and Algorithms - Complete Notes",
                subject: "Computer Science",
                professor: "Prof. Ajit Kumar",
                pages: 145,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 2,
                title: "Thermodynamics - Lecture Series Notes",
                subject: "Mechanical Engineering",
                professor: "Prof. Ramesh Singh",
                pages: 98,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 3,
                title: "Digital Signal Processing - Study Material",
                subject: "Electronics",
                professor: "Prof. Meera Patel",
                pages: 112,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 4,
                title: "Engineering Mathematics - Complete Guide",
                subject: "Mathematics",
                professor: "Prof. S. Krishnan",
                pages: 167,
                downloadUrl: "#",
                format: "PDF"
            }
        ],
        
        classes: [
            {
                id: 1,
                title: "Introduction to Machine Learning",
                professor: "Prof. Sunita Sarawagi",
                duration: "45:30",
                thumbnail: "assets/w4.jpeg",
                subject: "Computer Science",
                videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU"
            },
            {
                id: 2,
                title: "Data Structures: Binary Trees Explained",
                professor: "Prof. Ajit Kumar",
                duration: "38:15",
                thumbnail: "assets/w5.jpeg",
                subject: "Computer Science",
                videoUrl: "https://www.youtube.com/embed/H5JubkIy_p8"
            },
            {
                id: 3,
                title: "Fluid Mechanics Fundamentals",
                professor: "Prof. Ramesh Singh",
                duration: "42:20",
                thumbnail: "assets/w4.jpeg",
                subject: "Mechanical Engineering",
                videoUrl: "https://www.youtube.com/embed/Zcqe2aWBYtg"
            },
            {
                id: 4,
                title: "Introduction to VLSI Design",
                professor: "Prof. Meera Patel",
                duration: "51:10",
                thumbnail: "assets/w5.jpeg",
                subject: "Electronics",
                videoUrl: "https://www.youtube.com/embed/aHHd6jh5HZY"
            }
        ],
        
        // Trust & Social Proof
        reviews: [
            {
                id: 1,
                studentName: "Rahul Sharma",
                batch: "B.Tech 2024",
                rating: 5,
                text: "IIT Bombay transformed my career. The quality of teaching, research opportunities, and placement support is unmatched. The campus culture encourages innovation and entrepreneurship.",
                date: "Jan 2025"
            },
            {
                id: 2,
                studentName: "Priya Desai",
                batch: "M.Tech 2023",
                rating: 5,
                text: "Best decision of my life! The faculty are world-class researchers who genuinely care about students. The campus facilities are excellent and the peer group is incredibly talented.",
                date: "Dec 2024"
            },
            {
                id: 3,
                studentName: "Amit Patel",
                batch: "B.Tech 2022",
                rating: 4,
                text: "Great academics and placements. The competitive environment pushes you to excel. Excellent alumni network that opens doors globally. Only improvement needed is hostel food quality.",
                date: "Nov 2024"
            }
        ]
    },
    
    {
        id: 2,
        name: "IIM Ahmedabad",
        fullName: "Indian Institute of Management Ahmedabad",
        location: "Ahmedabad, Gujarat",
        city: "Ahmedabad",
        rating: 4.9,
        reviews: 1834,
        totalFees: "₹33 Lakh (2 years)",
        yearlyFee: "₹16.5 Lakh/year",
        established: 1961,
        stream: "MBA",
        tags: ["Private", "Research-based", "Top B-School"],
        type: "Autonomous",
        heroImage: "assets/w6.jpeg",
        gallery: ["assets/w6.jpeg", "assets/w4.jpeg"],
        about: "IIM Ahmedabad is India's premier management institution and among the top B-schools globally. Known for rigorous curriculum, case study methodology, and producing business leaders who shape industries.",
        campusFacilities: [
            "Louis Kahn Plaza - Iconic Architecture",
            "Ravi J. Matthai Centre for Educational Innovation",
            "Central Library with 1.5 lakh+ volumes",
            "State-of-art Classrooms",
            "Sports facilities and Fitness center"
        ],
        placementStats: {
            averagePackage: "₹33.67 LPA",
            highestPackage: "₹1.15 Crore (International)",
            placementRate: "100%",
            topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "Amazon"]
        },
        
        notes: [
            {
                id: 1,
                title: "Marketing Management - Complete Framework",
                subject: "Marketing",
                professor: "Prof. Saral Mukherjee",
                pages: 156,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 2,
                title: "Financial Accounting and Analysis",
                subject: "Finance",
                professor: "Prof. Ajay Pandey",
                pages: 189,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 3,
                title: "Operations Management - Case Studies",
                subject: "Operations",
                professor: "Prof. G. Raghuram",
                pages: 134,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 4,
                title: "Business Strategy and Policy",
                subject: "Strategy",
                professor: "Prof. Rakesh Basant",
                pages: 178,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 5,
                title: "Organizational Behavior and Leadership",
                subject: "OB & HR",
                professor: "Prof. Promilla Agarwal",
                pages: 145,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 6,
                title: "Business Analytics and Data Science",
                subject: "Analytics",
                professor: "Prof. Arnab Kumar Laha",
                pages: 167,
                downloadUrl: "#",
                format: "PDF"
            }
        ],
        
        classes: [
            {
                id: 1,
                title: "Marketing Strategy for Startups",
                professor: "Prof. Saral Mukherjee",
                duration: "52:40",
                thumbnail: "assets/w6.jpeg",
                subject: "Marketing",
                videoUrl: "https://www.youtube.com/embed/IHv3XDObN7s"
            },
            {
                id: 2,
                title: "Financial Statement Analysis",
                professor: "Prof. Ajay Pandey",
                duration: "48:25",
                thumbnail: "assets/w4.jpeg",
                subject: "Finance",
                videoUrl: "https://www.youtube.com/embed/9x8n4oTBBx8"
            },
            {
                id: 3,
                title: "Supply Chain Optimization",
                professor: "Prof. G. Raghuram",
                duration: "44:15",
                thumbnail: "assets/w6.jpeg",
                subject: "Operations",
                videoUrl: "https://www.youtube.com/embed/3p0UzW9yPQw"
            },
            {
                id: 4,
                title: "Business Model Innovation",
                professor: "Prof. Rakesh Basant",
                duration: "55:30",
                thumbnail: "assets/w4.jpeg",
                subject: "Strategy",
                videoUrl: "https://www.youtube.com/embed/FHEWj4KxHbU"
            },
            {
                id: 5,
                title: "Leadership and Team Management",
                professor: "Prof. Promilla Agarwal",
                duration: "46:50",
                thumbnail: "assets/w6.jpeg",
                subject: "OB & HR",
                videoUrl: "https://www.youtube.com/embed/VC4kTEJJ3uI"
            },
            {
                id: 6,
                title: "Data-Driven Decision Making",
                professor: "Prof. Arnab Kumar Laha",
                duration: "51:35",
                thumbnail: "assets/w4.jpeg",
                subject: "Analytics",
                videoUrl: "https://www.youtube.com/embed/wCF2PcrVNZY"
            }
        ],
        
        reviews: [
            {
                id: 1,
                studentName: "Sneha Kapoor",
                batch: "PGP 2024",
                rating: 5,
                text: "IIM-A is transformative. The case study method, peer learning, and faculty expertise create an unparalleled learning environment. The brand value opens doors globally.",
                date: "Jan 2025"
            },
            {
                id: 2,
                studentName: "Karthik Menon",
                batch: "PGP 2023",
                rating: 5,
                text: "Two years that shaped my career trajectory. Rigorous academics, amazing batch mates, and excellent placement opportunities. The alumni network is incredibly supportive.",
                date: "Dec 2024"
            },
            {
                id: 3,
                studentName: "Ananya Roy",
                batch: "PGP 2024",
                rating: 4,
                text: "Excellent academic rigor and career prospects. The pressure is intense but worth it. Campus culture is collaborative despite competition. Great ROI on investment.",
                date: "Nov 2024"
            }
        ]
    },
    
    {
        id: 3,
        name: "Delhi University",
        fullName: "University of Delhi",
        location: "New Delhi, Delhi",
        city: "Delhi",
        rating: 4.6,
        reviews: 3421,
        totalFees: "₹1.8 Lakh (3 years)",
        yearlyFee: "₹60,000/year",
        established: 1922,
        stream: "Arts",
        tags: ["Public", "Central University", "Diverse Programs"],
        type: "Government",
        heroImage: "assets/w7.jpeg",
        gallery: ["assets/w7.jpeg", "assets/w4.jpeg"],
        about: "University of Delhi is one of India's premier universities, offering diverse undergraduate and postgraduate programs. Known for quality education, vibrant campus culture, and distinguished alumni network.",
        campusFacilities: [
            "77 Affiliated Colleges",
            "Central Library with vast collection",
            "Sports facilities across colleges",
            "Cultural centers and auditoriums",
            "Modern computer labs and Wi-Fi"
        ],
        placementStats: {
            averagePackage: "₹6.5 LPA",
            highestPackage: "₹42 LPA",
            placementRate: "85%",
            topRecruiters: ["Deloitte", "EY", "KPMG", "Wipro", "TCS"]
        },
        
        notes: [
            {
                id: 1,
                title: "English Literature - Romantic Poetry",
                subject: "English",
                professor: "Prof. Malashri Lal",
                pages: 89,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 2,
                title: "Political Science - Indian Constitution",
                subject: "Political Science",
                professor: "Prof. Zoya Hasan",
                pages: 124,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 3,
                title: "Economics - Macro Economics Notes",
                subject: "Economics",
                professor: "Prof. Surajit Mazumdar",
                pages: 156,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 4,
                title: "History - Ancient India Study Guide",
                subject: "History",
                professor: "Prof. Upinder Singh",
                pages: 201,
                downloadUrl: "#",
                format: "PDF"
            }
        ],
        
        classes: [
            {
                id: 1,
                title: "Introduction to Sociology",
                professor: "Prof. Malashri Lal",
                duration: "41:20",
                thumbnail: "assets/w7.jpeg",
                subject: "Sociology",
                videoUrl: "https://www.youtube.com/embed/YnCJU6PaCio"
            },
            {
                id: 2,
                title: "Understanding Indian Politics",
                professor: "Prof. Zoya Hasan",
                duration: "46:35",
                thumbnail: "assets/w4.jpeg",
                subject: "Political Science",
                videoUrl: "https://www.youtube.com/embed/rStL7niR7gs"
            },
            {
                id: 3,
                title: "Principles of Economics",
                professor: "Prof. Surajit Mazumdar",
                duration: "39:45",
                thumbnail: "assets/w7.jpeg",
                subject: "Economics",
                videoUrl: "https://www.youtube.com/embed/3ez10ADR_gM"
            },
            {
                id: 4,
                title: "Medieval Indian History",
                professor: "Prof. Upinder Singh",
                duration: "53:15",
                thumbnail: "assets/w4.jpeg",
                subject: "History",
                videoUrl: "https://www.youtube.com/embed/ufbmXL28Yfo"
            }
        ],
        
        reviews: [
            {
                id: 1,
                studentName: "Riya Malhotra",
                batch: "B.A. 2024",
                rating: 5,
                text: "DU offers an amazing college experience. Great faculty, diverse student community, and vibrant cultural life. The brand value helps in career opportunities.",
                date: "Jan 2025"
            },
            {
                id: 2,
                studentName: "Arjun Verma",
                batch: "B.Com 2023",
                rating: 4,
                text: "Good academics and excellent campus culture. Active societies and festivals make college life memorable. Placement support varies by college but overall decent.",
                date: "Dec 2024"
            },
            {
                id: 3,
                studentName: "Isha Gupta",
                batch: "B.A. 2024",
                rating: 5,
                text: "One of the best decisions! The exposure, learning, and friendships are invaluable. Faculty are knowledgeable and the cutoff ensures bright peer group.",
                date: "Oct 2024"
            }
        ]
    },
    
    {
        id: 4,
        name: "Manipal University",
        fullName: "Manipal Academy of Higher Education",
        location: "Manipal, Karnataka",
        city: "Manipal",
        rating: 4.5,
        reviews: 2156,
        totalFees: "₹15.5 Lakh (4 years)",
        yearlyFee: "₹3.87 Lakh/year",
        established: 1953,
        stream: "Medical",
        tags: ["Private", "Medical Excellence", "International Standards"],
        type: "Private",
        heroImage: "assets/w9.jpeg",
        gallery: ["assets/w9.jpeg", "assets/w4.jpeg"],
        about: "Manipal Academy of Higher Education is a premier deemed university known for excellence in medical education. With world-class infrastructure, experienced faculty, and global recognition, MAHE is a top choice for medical aspirants.",
        campusFacilities: [
            "Super-specialty Hospital with 2000+ beds",
            "Advanced Medical Labs and Simulation Centers",
            "Digital Library with International Journals",
            "Modern Hostels for 15000+ students",
            "Sports Complex and Recreation facilities"
        ],
        placementStats: {
            averagePackage: "₹8.5 LPA",
            highestPackage: "₹35 LPA",
            placementRate: "92%",
            topRecruiters: ["Apollo", "Fortis", "Max Healthcare", "AIIMS", "International Hospitals"]
        },
        
        notes: [
            {
                id: 1,
                title: "Anatomy - Complete Human Body Systems",
                subject: "Medical Science",
                professor: "Dr. Rajeev Kumar",
                pages: 234,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 2,
                title: "Pharmacology - Drug Mechanisms",
                subject: "Medical Science",
                professor: "Dr. Sunita Rao",
                pages: 198,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 3,
                title: "Pathology - Disease Mechanisms",
                subject: "Medical Science",
                professor: "Dr. Anil Shetty",
                pages: 267,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 4,
                title: "Clinical Medicine - Case Studies",
                subject: "Medical Science",
                professor: "Dr. Priya Nair",
                pages: 189,
                downloadUrl: "#",
                format: "PDF"
            }
        ],
        
        classes: [
            {
                id: 1,
                title: "Introduction to Human Anatomy",
                professor: "Dr. Rajeev Kumar",
                duration: "58:40",
                thumbnail: "assets/w9.jpeg",
                subject: "Medical Science",
                videoUrl: "https://www.youtube.com/embed/KHle3skscr0"
            },
            {
                id: 2,
                title: "Pharmacology Basics",
                professor: "Dr. Sunita Rao",
                duration: "49:25",
                thumbnail: "assets/w4.jpeg",
                subject: "Medical Science",
                videoUrl: "https://www.youtube.com/embed/Cl8PoKJfQhw"
            },
            {
                id: 3,
                title: "Understanding Disease Pathways",
                professor: "Dr. Anil Shetty",
                duration: "54:30",
                thumbnail: "assets/w9.jpeg",
                subject: "Medical Science",
                videoUrl: "https://www.youtube.com/embed/X5QnUyHRRJo"
            },
            {
                id: 4,
                title: "Clinical Diagnosis Methods",
                professor: "Dr. Priya Nair",
                duration: "61:15",
                thumbnail: "assets/w4.jpeg",
                subject: "Medical Science",
                videoUrl: "https://www.youtube.com/embed/fUTEze-rQns"
            }
        ],
        
        reviews: [
            {
                id: 1,
                studentName: "Aditya Sharma",
                batch: "MBBS 2024",
                rating: 5,
                text: "Manipal provides excellent medical education. The hospital exposure from first year, quality faculty, and modern infrastructure prepare you well for medical practice.",
                date: "Jan 2025"
            },
            {
                id: 2,
                studentName: "Divya Reddy",
                batch: "MBBS 2023",
                rating: 4,
                text: "Great medical college with good clinical exposure. The patient diversity in the hospital helps learn various conditions. Campus life is vibrant with students from across India.",
                date: "Nov 2024"
            },
            {
                id: 3,
                studentName: "Vikram Singh",
                batch: "MD 2024",
                rating: 5,
                text: "One of the best medical universities in India. Research opportunities, international collaborations, and excellent faculty make it worth the investment.",
                date: "Oct 2024"
            }
        ]
    },
    
    {
        id: 5,
        name: "Shri Ram Group of Colleges",
        fullName: "Shri Ram Group of Colleges",
        location: "Muzaffarnagar, Uttar Pradesh",
        city: "Muzaffarnagar",
        rating: 4.3,
        reviews: 856,
        totalFees: "₹2.4 Lakh (2 years)",
        yearlyFee: "₹1.2 Lakh/year",
        established: 2008,
        stream: "MBA",
        tags: ["Private", "AICTE Approved", "Industry Focus"],
        type: "Private",
        heroImage: "assets/w4.jpeg",
        gallery: ["assets/w4.jpeg", "assets/w5.jpeg"],
        about: "Shri Ram Group of Colleges is a leading institution in Uttar Pradesh offering quality MBA education with strong industry connections. Known for practical learning approach, experienced faculty, and excellent placement support. The institution focuses on developing future business leaders through case studies, live projects, and industry internships.",
        campusFacilities: [
            "Modern Classrooms with Smart Boards",
            "Computer Labs with Latest Software",
            "Well-stocked Library with Business Journals",
            "Seminar Hall for Guest Lectures",
            "Wi-Fi enabled Campus"
        ],
        placementStats: {
            averagePackage: "₹4.5 LPA",
            highestPackage: "₹12 LPA",
            placementRate: "85%",
            topRecruiters: ["TCS", "Wipro", "ICICI Bank", "HDFC", "Amazon"]
        },
        
        notes: [
            {
                id: 1,
                title: "Strategic Management - Complete Guide",
                subject: "Strategic Management",
                professor: "Dr. Amit Sharma",
                pages: 142,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 2,
                title: "Human Resource Management Essentials",
                subject: "Human Resources",
                professor: "Prof. Neha Gupta",
                pages: 128,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 3,
                title: "Digital Marketing Strategy",
                subject: "Marketing",
                professor: "Dr. Rajesh Kumar",
                pages: 156,
                downloadUrl: "#",
                format: "PDF"
            },
            {
                id: 4,
                title: "Corporate Finance and Investment",
                subject: "Finance",
                professor: "Prof. Priya Singh",
                pages: 178,
                downloadUrl: "#",
                format: "PDF"
            }
        ],
        
        classes: [
            {
                id: 1,
                title: "Introduction to Business Strategy",
                professor: "Dr. Amit Sharma",
                duration: "42:30",
                thumbnail: "assets/w4.jpeg",
                subject: "Strategic Management",
                videoUrl: "https://www.youtube.com/embed/FHEWj4KxHbU"
            },
            {
                id: 2,
                title: "Talent Acquisition and Retention",
                professor: "Prof. Neha Gupta",
                duration: "38:45",
                thumbnail: "assets/w5.jpeg",
                subject: "Human Resources",
                videoUrl: "https://www.youtube.com/embed/VC4kTEJJ3uI"
            },
            {
                id: 3,
                title: "Social Media Marketing Fundamentals",
                professor: "Dr. Rajesh Kumar",
                duration: "45:20",
                thumbnail: "assets/w4.jpeg",
                subject: "Digital Marketing",
                videoUrl: "https://www.youtube.com/embed/IHv3XDObN7s"
            },
            {
                id: 4,
                title: "Financial Statement Analysis for Managers",
                professor: "Prof. Priya Singh",
                duration: "50:15",
                thumbnail: "assets/w5.jpeg",
                subject: "Finance",
                videoUrl: "https://www.youtube.com/embed/9x8n4oTBBx8"
            }
        ],
        
        reviews: [
            {
                id: 1,
                studentName: "Rohit Verma",
                batch: "MBA 2024",
                rating: 4,
                text: "Great college with good faculty and placement support. The practical approach to learning through live projects helped me understand business concepts better. Placements are decent with companies from various sectors visiting campus.",
                date: "Jan 2025"
            },
            {
                id: 2,
                studentName: "Anjali Saxena",
                batch: "MBA 2023",
                rating: 5,
                text: "Best decision for MBA in Muzaffarnagar region. Faculty are experienced and supportive. Regular guest lectures from industry experts give real-world insights. Campus infrastructure is good with all modern facilities.",
                date: "Dec 2024"
            },
            {
                id: 3,
                studentName: "Vikash Singh",
                batch: "MBA 2024",
                rating: 4,
                text: "Good college for MBA at affordable fees. Focus on practical learning and industry exposure. The placement cell works hard to get good companies. Overall satisfied with my experience here.",
                date: "Nov 2024"
            }
        ]
    }
];

// Helper function to get university by ID
function getUniversityById(id) {
    return UNIVERSITIES.find(uni => uni.id === id);
}

// Helper function to filter universities
function filterUniversities(searchTerm = '', stream = '', tag = '') {
    return UNIVERSITIES.filter(uni => {
        const matchesSearch = !searchTerm || 
            uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            uni.city.toLowerCase().includes(searchTerm.toLowerCase());
            
        const matchesStream = !stream || uni.stream === stream;
        const matchesTag = !tag || uni.tags.includes(tag);
        
        return matchesSearch && matchesStream && matchesTag;
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UNIVERSITIES, getUniversityById, filterUniversities };
}

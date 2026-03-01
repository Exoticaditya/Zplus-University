#!/usr/bin/env python3
"""
seed_colleges.py — Insert top 100 Indian colleges into Zpluse University DB
─────────────────────────────────────────────────────────────────────────────
Prerequisites:
  pip install psycopg2-binary python-dotenv

Before running:
  1. Run backend/sql/migrate_college_fields.sql in Supabase SQL Editor
  2. Ensure your .env has TRANSACTION_POOLER_URL or DATABASE_URL

Run:
  python seed_colleges.py
─────────────────────────────────────────────────────────────────────────────
"""

import os
import sys
from urllib.parse import urlparse, unquote

try:
    import psycopg2
    from psycopg2.extras import execute_values
except ImportError:
    print("❌  Missing psycopg2. Run:  pip install psycopg2-binary")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "backend", ".env"))
except ImportError:
    pass  # fine — use system env vars


# ─── Cover image pool (Unsplash static URLs, cycle through) ──────────────────
COVERS = [
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=80",
]

def logo(domain):
    return f"https://logo.clearbit.com/{domain}"

def cover(i):
    return COVERS[i % len(COVERS)]


# ─── College Data ─────────────────────────────────────────────────────────────
# Columns:
# (name, description, city, state, type, established_year, rating, is_featured,
#  website, logo_url, cover_image_url, fee_structure, affiliation, courses, nirf_rank)

COLLEGES = [

    # ════════════ IITs ════════════
    (
        "Indian Institute of Technology Madras",
        "IIT Madras is India's top-ranked engineering institution, consistently holding the #1 NIRF Engineering rank. Established on the banks of the Adyar River in Chennai, it offers world-class research facilities, an incubation cell supporting 300+ startups, and strong industry linkages with companies like Samsung, TCS, and Qualcomm.",
        "Chennai", "Tamil Nadu", "Public", 1959, 4.95, True,
        "https://www.iitm.ac.in", logo("iitm.ac.in"), cover(0),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D", "Dual Degree"], 1
    ),
    (
        "Indian Institute of Technology Bombay",
        "IIT Bombay, located in Powai, Mumbai, is one of India's most prestigious engineering universities. Known for its vibrant campus life, top placement records with packages reaching ₹3+ Cr, and pioneering research in AI, nanotechnology, and aerospace engineering. Alumni include global leaders at Google, McKinsey, and NASA.",
        "Mumbai", "Maharashtra", "Public", 1958, 4.90, True,
        "https://www.iitb.ac.in", logo("iitb.ac.in"), cover(1),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "M.Sc", "MBA (SJMSOM)", "Ph.D", "Dual Degree"], 3
    ),
    (
        "Indian Institute of Technology Delhi",
        "Located in Hauz Khas, New Delhi, IIT Delhi is among the foremost institutions for engineering and technology education in India. The institute has produced Nobel laureates, Padma awardees, and Fortune 500 CEOs. Its proximity to India's capital gives students unparalleled access to policy, industry, and research ecosystems.",
        "New Delhi", "Delhi", "Public", 1961, 4.88, True,
        "https://home.iitd.ac.in", logo("iitd.ac.in"), cover(2),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D", "Master of Design"], 4
    ),
    (
        "Indian Institute of Technology Kanpur",
        "IIT Kanpur, established with US collaboration, introduced computer science education in India. Renowned for its strong programs in aerospace, chemical engineering, and physics. Its alumni include prominent scientists, entrepreneurs, and Infosys co-founder Nandan Nilekani.",
        "Kanpur", "Uttar Pradesh", "Public", 1959, 4.87, True,
        "https://www.iitk.ac.in", logo("iitk.ac.in"), cover(3),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D", "B.Sc (4-yr)"], 5
    ),
    (
        "Indian Institute of Technology Kharagpur",
        "The oldest and largest IIT, IIT Kharagpur sprawls over 2,100 acres and offers the widest range of undergraduate and postgraduate programs among all IITs. It pioneered legal education at an engineering institution through its Rajiv Gandhi School of Intellectual Property Law.",
        "Kharagpur", "West Bengal", "Public", 1951, 4.85, True,
        "https://www.iitkgp.ac.in", logo("iitkgp.ac.in"), cover(4),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "MBA", "MCP", "LL.B", "Ph.D", "B.Arch"], 6
    ),
    (
        "Indian Institute of Technology Roorkee",
        "India's oldest technical institution, founded in 1847 as the College of Civil Engineering. IIT Roorkee set the gold standard for civil and structural engineering education in South Asia. Its campus, nestled in the foothills of the Himalayas, spans 365 acres and is a national heritage site.",
        "Roorkee", "Uttarakhand", "Public", 1847, 4.82, True,
        "https://www.iitr.ac.in", logo("iitr.ac.in"), cover(5),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "MBA", "M.Arch", "M.Sc", "Ph.D"], 7
    ),
    (
        "Indian Institute of Technology Guwahati",
        "Established on the north bank of the Brahmaputra River, IIT Guwahati serves as a center of excellence for northeast India. Its picturesque 285-acre campus houses over 300 research laboratories and 20 academic departments. It has garnered recognition for environmental engineering and biosciences research.",
        "Guwahati", "Assam", "Public", 1994, 4.70, True,
        "https://www.iitg.ac.in", logo("iitg.ac.in"), cover(6),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D", "B.Des"], 9
    ),
    (
        "Indian Institute of Technology Hyderabad",
        "A new-generation IIT known for innovation-driven research, IIT Hyderabad has made rapid strides in AI, data science, and semiconductor design. Its industry-engaged curriculum and proximity to Hyderabad's tech corridor make it a sought-after destination for STEM graduates.",
        "Hyderabad", "Telangana", "Public", 2008, 4.60, False,
        "https://www.iith.ac.in", logo("iith.ac.in"), cover(7),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A+",
        ["B.Tech", "M.Tech", "M.Sc", "Ph.D", "B.Tech + M.Tech (Dual)"], 8
    ),
    (
        "Indian Institute of Technology (BHU) Varanasi",
        "One of the few IITs with a more than century-old legacy, IIT (BHU) is part of the Banaras Hindu University complex. It combines the spiritual heritage of Varanasi with modern engineering education, offering unique inter-disciplinary programs spanning humanities, science, and technology.",
        "Varanasi", "Uttar Pradesh", "Public", 1919, 4.55, False,
        "https://www.iitbhu.ac.in", logo("iitbhu.ac.in"), cover(8),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A",
        ["B.Tech", "IDD (5-yr Integrated)", "M.Tech", "MBA", "Ph.D"], 10
    ),
    (
        "Indian Institute of Technology Indore",
        "A dynamic young IIT building a reputation for interdisciplinary research in quantum computing, advanced materials, and life sciences. IIT Indore's sprawling Simrol campus features state-of-the-art labs and a growing startup ecosystem.",
        "Indore", "Madhya Pradesh", "Public", 2009, 4.45, False,
        "https://www.iiti.ac.in", logo("iiti.ac.in"), cover(9),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Sc", "M.Tech", "Ph.D", "B.S. (Research)"], 17
    ),
    (
        "Indian Institute of Technology Gandhinagar",
        "Known for its interdisciplinary liberal approach to engineering education, IIT Gandhinagar requires students to complete courses in humanities, social sciences, and design. Its waterfront Palaj campus is architecturally stunning and features India's first academic observatory.",
        "Gandhinagar", "Gujarat", "Public", 2008, 4.42, False,
        "https://www.iitgn.ac.in", logo("iitgn.ac.in"), cover(10),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Sc", "M.Tech", "Ph.D", "Cognitive Science"], 14
    ),
    (
        "Indian Institute of Technology Jodhpur",
        "Strategically located in the Blue City, IIT Jodhpur focuses on sustainable technologies, desert engineering, and renewable energy — aligning its research with Rajasthan's unique geographic challenges and opportunities.",
        "Jodhpur", "Rajasthan", "Public", 2008, 4.30, False,
        "https://www.iitj.ac.in", logo("iitj.ac.in"), cover(11),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "M.Sc", "Ph.D", "B.Tech + M.Tech (Dual)"], 18
    ),
    (
        "Indian Institute of Technology Patna",
        "IIT Patna serves as a center of technical excellence for Bihar and the broader eastern India region. Its new Bihta campus features modern facilities and emphasizes research in healthcare technologies, flood risk management, and rural engineering.",
        "Patna", "Bihar", "Public", 2008, 4.20, False,
        "https://www.iitp.ac.in", logo("iitp.ac.in"), cover(0),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "M.Sc", "Ph.D"], 21
    ),
    (
        "Indian Institute of Technology (ISM) Dhanbad",
        "Originally the Indian School of Mines (1926), IIT (ISM) Dhanbad is the only IIT with a mining and petroleum engineering legacy. It remains India's premier institution for energy, mining, and geological sciences, with placements in ONGC, Coal India, and global energy firms.",
        "Dhanbad", "Jharkhand", "Public", 1926, 4.40, False,
        "https://www.iitism.ac.in", logo("iitism.ac.in"), cover(1),
        "₹2.2L/year (B.Tech)", "Institute of National Importance | NAAC A",
        ["B.Tech", "M.Tech", "MBA", "M.Sc", "Ph.D", "Integrated M.Tech"], 11
    ),
    (
        "Indian Institute of Technology Ropar",
        "IIT Ropar is a new-generation IIT in Punjab, known for its collaborative research with international universities. It focuses on health technology, agriculture engineering, and sustainable infrastructure for rural India.",
        "Ropar", "Punjab", "Public", 2008, 4.15, False,
        "https://www.iitrpr.ac.in", logo("iitrpr.ac.in"), cover(2),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Sc", "M.Tech", "Ph.D"], 27
    ),
    (
        "Indian Institute of Technology Mandi",
        "Nestled in the Uhl river valley of Himachal Pradesh, IIT Mandi is pioneering research in disaster management, mountain ecology, and smart grids. Its unique Himalayan location inspires environment-conscious engineering education.",
        "Mandi", "Himachal Pradesh", "Public", 2009, 4.10, False,
        "https://www.iitmandi.ac.in", logo("iitmandi.ac.in"), cover(3),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "M.Sc", "Ph.D"], 29
    ),
    (
        "Indian Institute of Technology Tirupati",
        "One of the newest IITs, IIT Tirupati is building academic and research strength rapidly. Located near the iconic Tirumala temple town, the institute focuses on cleantech, water management, and advanced manufacturing.",
        "Tirupati", "Andhra Pradesh", "Public", 2015, 4.00, False,
        "https://iittp.ac.in", logo("iittp.ac.in"), cover(4),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "Ph.D"], 32
    ),
    (
        "Indian Institute of Technology Palakkad",
        "IIT Palakkad embodies the spirit of innovation in God's Own Country, with research strengths in photonic devices, green building design, and culturally-aware technology education. Its Kanjikode campus integrates nature and modern infrastructure.",
        "Palakkad", "Kerala", "Public", 2015, 4.00, False,
        "https://iitpkd.ac.in", logo("iitpkd.ac.in"), cover(5),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "Ph.D", "M.Sc"], 33
    ),
    (
        "Indian Institute of Technology Bhubaneswar",
        "Set against the cultural backdrop of Odisha's capital, IIT Bhubaneswar has developed strong programs in earth sciences, school of basic sciences, and humanities. Its 936-acre Argul campus offers a serene academic environment.",
        "Bhubaneswar", "Odisha", "Public", 2008, 4.10, False,
        "https://www.iitbbs.ac.in", logo("iitbbs.ac.in"), cover(6),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "M.Sc", "Ph.D"], 26
    ),
    (
        "Indian Institute of Technology Jammu",
        "IIT Jammu is building its identity as a hub for tech innovation in the J&K region. It focuses on disaster mitigation technologies, clean energy, and research on high-altitude ecosystems.",
        "Jammu", "Jammu & Kashmir", "Public", 2016, 3.90, False,
        "https://iitjammu.ac.in", logo("iitjammu.ac.in"), cover(7),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "Ph.D"], 36
    ),
    (
        "Indian Institute of Technology Dharwad",
        "A brand-new IIT in northern Karnataka dedicated to advancing electronic systems, machine intelligence, and sustainable agriculture technology. IIT Dharwad collaborates with local industries and the agricultural belt of Hubli-Dharwad.",
        "Dharwad", "Karnataka", "Public", 2016, 3.90, False,
        "https://www.iitdh.ac.in", logo("iitdh.ac.in"), cover(8),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "Ph.D"], 37
    ),
    (
        "Indian Institute of Technology Bhilai",
        "Serving the Chhattisgarh region, IIT Bhilai draws inspiration from the steel city heritage of Bhilai. The institute is developing expertise in industrial automation, metallurgical engineering, and smart manufacturing.",
        "Bhilai", "Chhattisgarh", "Public", 2016, 3.80, False,
        "https://www.iitbhilai.ac.in", logo("iitbhilai.ac.in"), cover(9),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "Ph.D"], 38
    ),
    (
        "Indian Institute of Technology Goa",
        "Situated on the Cuncolim campus in the land of beaches and culture, IIT Goa emphasizes innovation-driven education with a focus on ocean engineering, coastal management, and sustainable tourism technology.",
        "Panjim", "Goa", "Public", 2016, 3.90, False,
        "https://www.iitgoa.ac.in", logo("iitgoa.ac.in"), cover(10),
        "₹2.2L/year (B.Tech)", "Institute of National Importance",
        ["B.Tech", "M.Tech", "Ph.D"], 35
    ),

    # ════════════ IIMs ════════════
    (
        "Indian Institute of Management Ahmedabad",
        "IIMA is the undisputed crown jewel of Indian management education, consistently ranked #1 in NIRF Management. Its prestigious Post Graduate Programme (PGP) has a median placement CTC exceeding ₹35 LPA. Alumni include the heads of global corporations, government ministries, and Nobel committee members.",
        "Ahmedabad", "Gujarat", "Public", 1961, 4.95, True,
        "https://www.iima.ac.in", logo("iima.ac.in"), cover(0),
        "₹23L (2-yr PGP)", "AACSB | EQUIS | AMBA Triple Accredited",
        ["MBA (PGP)", "Ph.D (FPM)", "Executive MBA (PGPX)", "PGPEM", "EPGP"], 1
    ),
    (
        "Indian Institute of Management Bangalore",
        "IIM Bangalore is home to India's most entrepreneurial MBA cohort, with the highest number of student-led startups among IIMs. Its NSR Road campus in Bengaluru places graduates in the heart of India's Silicon Valley.",
        "Bengaluru", "Karnataka", "Public", 1973, 4.92, True,
        "https://www.iimb.ac.in", logo("iimb.ac.in"), cover(1),
        "₹24L (2-yr PGP)", "AACSB | EQUIS | AMBA Triple Accredited",
        ["MBA (PGP)", "Ph.D (FPM)", "PGPEM", "Executive MBA", "NSRCEL Startup"], 3
    ),
    (
        "Indian Institute of Management Calcutta",
        "The oldest IIM, established with MIT Sloan collaboration, IIM Calcutta is synonymous with analytical rigor and finance excellence. Its Joka campus has consistently produced India's top general managers and finance professionals.",
        "Kolkata", "West Bengal", "Public", 1961, 4.90, True,
        "https://www.iimcal.ac.in", logo("iimcal.ac.in"), cover(2),
        "₹22L (2-yr PGP)", "AACSB | EQUIS Accredited",
        ["MBA (PGP)", "Ph.D (FPM)", "PGPEX", "MBA (Ex)", "PGDBA"], 4
    ),
    (
        "Indian Institute of Management Lucknow",
        "One of the original five IIMs, IIM Lucknow is known for its agri-business, rural management, and sustainability programs. Its Noida campus extends reach to the Delhi NCR corporate world.",
        "Lucknow", "Uttar Pradesh", "Public", 1984, 4.72, True,
        "https://www.iiml.ac.in", logo("iiml.ac.in"), cover(3),
        "₹19L (2-yr PGP)", "AACSB | AMBA Accredited",
        ["MBA (PGP)", "PGP-ABM (Agri-Business)", "Ph.D (FPM)", "iMBA", "IPMX"], 7
    ),
    (
        "Indian Institute of Management Kozhikode",
        "IIM Kozhikode introduced liberal management education to India with its unique EPGPX and programs integrating art, culture, and technology with business. Its hilltop campus offers breathtaking views of Kozhikode.",
        "Kozhikode", "Kerala", "Public", 1996, 4.65, False,
        "https://www.iimk.ac.in", logo("iimk.ac.in"), cover(4),
        "₹18L (2-yr PGP)", "AACSB Accredited",
        ["MBA (PGP)", "Ph.D (FPM)", "Executive MBA (EPGPX)", "MBA (BL)", "MBA (FA)"], 8
    ),
    (
        "Indian Institute of Management Indore",
        "IIM Indore's 5-year Integrated Programme in Management is one of the most sought-after business programs in India for school graduates. Located across two campuses in Indore and Mumbai, it integrates finance, consulting, and digital business.",
        "Indore", "Madhya Pradesh", "Public", 1996, 4.63, False,
        "https://www.iimidr.ac.in", logo("iimidr.ac.in"), cover(5),
        "₹18L (2-yr PGP)", "AACSB Accredited",
        ["MBA (PGP)", "IPM (5-yr Integrated)", "Ph.D (FPM)", "Executive PGP"], 9
    ),
    (
        "Indian Institute of Management Shillong",
        "India's first 'Green B-School', IIM Shillong started in the historic Mayurbhanj House. Its PGPEX and MBA programs carry a strong focus on sustainability, Northeast India business strategy, and responsible management.",
        "Shillong", "Meghalaya", "Public", 2007, 4.20, False,
        "https://www.iimshillong.ac.in", logo("iimshillong.ac.in"), cover(6),
        "₹14L (2-yr PGP)", "AMBA Accredited",
        ["MBA (PGP)", "Ph.D (FPM)", "PGPEX", "Working Manager's Programme"], 12
    ),
    (
        "Indian Institute of Management Rohtak",
        "Located in the agri-industrial heartland of Haryana, IIM Rohtak rapidly built its reputation through strong placement partnerships with FMCG, BFSI, and consulting sectors.",
        "Rohtak", "Haryana", "Public", 2010, 4.10, False,
        "https://www.iimrohtak.ac.in", logo("iimrohtak.ac.in"), cover(7),
        "₹14L (2-yr PGP)", "AMBA Candidacy",
        ["MBA (PGP)", "Ph.D (FPM)", "Executive MBA", "IPM (5-yr)"], 15
    ),

    # ════════════ NITs ════════════
    (
        "National Institute of Technology Tiruchirappalli",
        "NIT Trichy is consistently ranked as the best NIT in India. Established on the banks of the Cauvery River, it offers exceptional engineering programs and boasts one of the highest campus placement rates among RECs and NITs, with companies like Microsoft, Amazon, and Goldman Sachs recruiting regularly.",
        "Tiruchirappalli", "Tamil Nadu", "Public", 1964, 4.65, True,
        "https://www.nitt.edu", logo("nitt.edu"), cover(8),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "MCA", "Ph.D"], 12
    ),
    (
        "National Institute of Technology Warangal",
        "One of the oldest and most prestigious NITs, NIT Warangal is known for strong placement records and rigorous engineering education. Its 247-acre campus in Telangana is home to 14 academic departments and world-class computing labs.",
        "Warangal", "Telangana", "Public", 1959, 4.55, True,
        "https://www.nitw.ac.in", logo("nitw.ac.in"), cover(9),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A++",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D"], 13
    ),
    (
        "National Institute of Technology Karnataka (Surathkal)",
        "NITK Surathkal is situated on the Arabian Sea coastline, offering a unique blend of engineering excellence and coastal research. Known for marine engineering, offshore structures, and coastal zone management alongside core engineering streams.",
        "Mangalore", "Karnataka", "Public", 1960, 4.50, True,
        "https://www.nitk.ac.in", logo("nitk.ac.in"), cover(10),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A+",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D", "B.Arch"], 15
    ),
    (
        "National Institute of Technology Calicut",
        "NIT Calicut in the Westhill campus of Kozhikode is among India's finest technical institutions, offering 10 B.Tech programs. Its CSED department is particularly sought after for software engineering placements.",
        "Kozhikode", "Kerala", "Public", 1961, 4.45, False,
        "https://www.nitc.ac.in", logo("nitc.ac.in"), cover(11),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A+",
        ["B.Tech", "M.Tech", "M.Sc", "MCA", "MBA", "Ph.D"], 16
    ),
    (
        "Visvesvaraya National Institute of Technology Nagpur",
        "Named after the legendary engineer-statesman Sir M. Visvesvaraya, VNIT Nagpur is central India's premier technical institution. Strong in civil, mechanical, and electronics engineering, it has partnerships with IIT Bombay and international universities.",
        "Nagpur", "Maharashtra", "Public", 1960, 4.40, False,
        "https://www.vnit.ac.in", logo("vnit.ac.in"), cover(0),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A+",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D", "B.Arch"], 20
    ),
    (
        "National Institute of Technology Rourkela",
        "NIT Rourkela is situated adjacent to India's first public sector steel plant. It has evolved into a premier research university with special strengths in metallurgical engineering, ceramics, and materials science.",
        "Rourkela", "Odisha", "Public", 1961, 4.35, False,
        "https://www.nitrkl.ac.in", logo("nitrkl.ac.in"), cover(1),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A+",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "MCA", "Ph.D"], 19
    ),
    (
        "Motilal Nehru National Institute of Technology Allahabad",
        "MNNIT Allahabad in Prayagraj has a storied history of producing India's top engineers. The institute is known for strong CS and electronics placements, with top recruiters including Google, Goldman Sachs, and DE Shaw.",
        "Prayagraj", "Uttar Pradesh", "Public", 1961, 4.30, False,
        "https://www.mnnit.ac.in", logo("mnnit.ac.in"), cover(2),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A",
        ["B.Tech", "M.Tech", "M.Sc (Tech)", "MBA", "Ph.D"], 22
    ),
    (
        "National Institute of Technology Durgapur",
        "NIT Durgapur serves West Bengal and the eastern industrial belt. Its proximity to the Durgapur Steel City has historically produced engineers who lead India's heavy industry sector.",
        "Durgapur", "West Bengal", "Public", 1960, 4.20, False,
        "https://www.nitdgp.ac.in", logo("nitdgp.ac.in"), cover(3),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "MCA", "Ph.D"], 28
    ),
    (
        "Malaviya National Institute of Technology Jaipur",
        "MNIT Jaipur, in the Pink City, blends Rajputana heritage with modern engineering education. The institute has strong alumni networks in aerospace, automotive, and IT sectors across India and abroad.",
        "Jaipur", "Rajasthan", "Public", 1963, 4.25, False,
        "https://www.mnit.ac.in", logo("mnit.ac.in"), cover(4),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D", "B.Arch"], 24
    ),
    (
        "Sardar Vallabhbhai National Institute of Technology Surat",
        "SVNIT Surat in Gujarat has grown into a nationally recognized institution with strong programs in chemical, textile, and electronics engineering, drawing students from across India.",
        "Surat", "Gujarat", "Public", 1961, 4.10, False,
        "https://www.svnit.ac.in", logo("svnit.ac.in"), cover(5),
        "₹1.5L/year (B.Tech)", "Institute of National Importance | NAAC A",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D"], 30
    ),

    # ════════════ Deemed/Research Universities ════════════
    (
        "Indian Institute of Science",
        "IISc Bengaluru is India's top-ranked research university and one of Asia's finest scientific institutions. Established with Tata endowment in 1909, it leads the world in materials science, aerospace, and life sciences research. Over 400 faculty members have won major national and international scientific awards.",
        "Bengaluru", "Karnataka", "Deemed", 1909, 4.98, True,
        "https://www.iisc.ac.in", logo("iisc.ac.in"), cover(6),
        "₹1.5L/year (UG)", "Institute of Eminence | NAAC A++ | QS Top 200",
        ["B.Sc Research", "M.Tech", "M.Sc (Engg)", "Ph.D", "M.Mgt"], 1
    ),
    (
        "Birla Institute of Technology and Science, Pilani",
        "BITS Pilani is India's most respected private engineering university, consistently competing with IITs for top students. Its innovative Practice School program, alumni networks in Silicon Valley, and unique off-campus work-integrated learning model make it stand apart from all peers.",
        "Pilani", "Rajasthan", "Deemed", 1964, 4.82, True,
        "https://www.bits-pilani.ac.in", logo("bits-pilani.ac.in"), cover(7),
        "₹5.5L/year (B.E.)", "NAAC A | UGC Deemed University | QS Top 500",
        ["B.E.", "B.Pharm", "M.Sc", "M.E.", "MBA", "Ph.D", "M.Phil"], 26
    ),
    (
        "Birla Institute of Technology and Science, Goa",
        "BITS Goa combines the academic excellence of the BITS system with the unique cultural environment of India's coastal paradise. Students benefit from BITS' Practice School system and Pan-BITS alumni networks while enjoying Goa's internationally vibrant setting.",
        "North Goa", "Goa", "Deemed", 2004, 4.60, False,
        "https://www.bits-pilani.ac.in/goa", logo("bits-pilani.ac.in"), cover(8),
        "₹5.5L/year (B.E.)", "NAAC A | UGC Deemed University",
        ["B.E.", "B.Pharm", "M.Sc", "M.E.", "Ph.D"], None
    ),
    (
        "Birla Institute of Technology and Science, Hyderabad",
        "BITS Hyderabad is strategically located in India's pharma and IT hub. With state-of-the-art labs and direct industry access in Hyderabad's Genome Valley and HITEC City, it offers excellent research and internship opportunities.",
        "Hyderabad", "Telangana", "Deemed", 2008, 4.58, False,
        "https://www.bits-pilani.ac.in/hyderabad", logo("bits-pilani.ac.in"), cover(9),
        "₹5.5L/year (B.E.)", "NAAC A | UGC Deemed University",
        ["B.E.", "B.Pharm", "M.Sc", "M.E.", "Ph.D"], None
    ),
    (
        "Manipal Academy of Higher Education",
        "One of India's largest private universities, Manipal Academy was a pioneer in self-financed engineering and medical education. Its sprawling campus in Karnataka houses 28 constituent institutions, 30,000+ students from 57 countries, and produces top doctors, engineers, and managers annually.",
        "Manipal", "Karnataka", "Deemed", 1953, 4.40, True,
        "https://manipal.edu", logo("manipal.edu"), cover(10),
        "₹3.5L-8L/year", "NAAC A+ | UGC Category I | QS Top 801",
        ["MBBS", "B.Tech", "BDS", "B.Pharm", "MBA", "MCA", "Law", "Architecture", "Ph.D"], None
    ),
    (
        "Vellore Institute of Technology",
        "VIT Vellore is one of India's largest private engineering universities by enrollment, with 50,000+ students across four campuses. Known for its international collaborations with 400+ universities, strong B.Tech placements in IT companies, and a vibrant campus culture.",
        "Vellore", "Tamil Nadu", "Deemed", 1984, 4.35, True,
        "https://vit.ac.in", logo("vit.ac.in"), cover(11),
        "₹2.5L-3.5L/year (B.Tech)", "NAAC A++ | UGC Category I | QS Top 801",
        ["B.Tech", "M.Tech", "MBA", "MCA", "M.Sc", "B.Des", "Ph.D"], 21
    ),
    (
        "SRM Institute of Science and Technology",
        "SRM is among India's fastest-growing deemed universities with campuses in Chennai, Delhi NCR, Sikkim, and Andhra Pradesh. Known for innovative programs in AI, blockchain, cybersecurity, and biomedical engineering.",
        "Chennai", "Tamil Nadu", "Deemed", 1985, 4.10, False,
        "https://www.srmist.edu.in", logo("srmist.edu.in"), cover(0),
        "₹2.5L-4L/year (B.Tech)", "NAAC A+ | UGC Category II",
        ["B.Tech", "M.Tech", "MBA", "M.Sc", "BCA", "B.Com", "Ph.D"], 37
    ),
    (
        "Symbiosis International University",
        "Symbiosis International is Pune's top deemed university, known for pioneering business, law, media, and design education. Its multi-disciplinary institutions within a shared campus model foster cross-domain learning and rich campus life.",
        "Pune", "Maharashtra", "Deemed", 2002, 4.25, False,
        "https://www.siu.edu.in", logo("siu.edu.in"), cover(1),
        "₹3L-8L/year", "NAAC A++ | UGC Category I",
        ["MBA", "BBA", "LLB", "B.Com", "B.Sc", "BA", "B.Tech", "Media & Communication", "Ph.D"], None
    ),
    (
        "Amity University",
        "India's largest private university group, Amity operates campuses across India, Dubai, London, and Singapore. It offers a vast array of programs from engineering and management to film studies and international relations, with strong global industry tie-ups.",
        "Noida", "Uttar Pradesh", "Private", 2005, 3.90, False,
        "https://www.amity.edu", logo("amity.edu"), cover(2),
        "₹2L-5L/year", "NAAC A+ | AIU Member",
        ["B.Tech", "MBA", "BBA", "LLB", "B.Sc", "BA", "BCA", "B.Des", "Ph.D"], None
    ),

    # ════════════ AIIMS & Medical ════════════
    (
        "All India Institute of Medical Sciences, New Delhi",
        "AIIMS New Delhi is India's pinnacle of medical education, research, and patient care. Established by an Act of Parliament, it has trained generations of India's finest doctors, surgeons, and biomedical scientists. Its OPD serves over 10,000 patients daily, making it the largest hospital in Asia.",
        "New Delhi", "Delhi", "Public", 1956, 4.95, True,
        "https://www.aiims.edu", logo("aiims.edu"), cover(3),
        "₹6,000/year (MBBS)", "Institute of National Importance | MCI Approved | NAAC A++",
        ["MBBS", "MD", "MS", "MCh", "DM", "B.Sc Nursing", "B.Sc Paramedical", "Ph.D"], 1
    ),
    (
        "All India Institute of Medical Sciences, Jodhpur",
        "AIIMS Jodhpur is a premier medical institution serving Rajasthan and western India. It combines curative healthcare with research in desert medicine, tropical diseases, and maternal health programs.",
        "Jodhpur", "Rajasthan", "Public", 2012, 4.45, False,
        "https://www.aiimsjodhpur.edu.in", logo("aiimsjodhpur.edu.in"), cover(4),
        "₹6,000/year (MBBS)", "Institute of National Importance | NMC Approved",
        ["MBBS", "MD", "MS", "B.Sc Nursing", "Ph.D"], None
    ),
    (
        "Jawaharlal Institute of Postgraduate Medical Education and Research",
        "JIPMER Puducherry is one of India's oldest and most respected medical institutions, with roots dating to 1823. It is consistently ranked among the top 3 medical colleges in India and is known for clinical excellence and research in tropical diseases and surgery.",
        "Puducherry", "Puducherry", "Public", 1823, 4.85, True,
        "https://www.jipmer.edu.in", logo("jipmer.edu.in"), cover(5),
        "₹6,000/year (MBBS)", "Institute of National Importance | NMC Approved",
        ["MBBS", "MD", "MS", "MCh", "DM", "B.Sc", "M.Sc", "Ph.D"], 2
    ),

    # ════════════ Central Universities ════════════
    (
        "University of Delhi",
        "Delhi University, established in 1922, is India's most prominent central university with over 600,000 students. Its 90+ affiliated colleges span across Delhi, offering programs in science, humanities, law, commerce, and management. Miranda House, SRCC, and St. Stephen's are among its famed constituent colleges.",
        "New Delhi", "Delhi", "Public", 1922, 4.60, True,
        "https://www.du.ac.in", logo("du.ac.in"), cover(6),
        "₹15K-1L/year", "NAAC A++ | UGC | AIU Member",
        ["BA", "B.Sc", "B.Com", "B.Tech", "LLB", "MA", "M.Sc", "MBA", "Ph.D"], 14
    ),
    (
        "Jawaharlal Nehru University",
        "JNU New Delhi is India's most distinguished social sciences university, known for producing India's top bureaucrats, diplomats, and academics. Its campus is legendary for intellectual vibrancy, political discourse, and some of the world's cheapest quality hostel and mess facilities for research scholars.",
        "New Delhi", "Delhi", "Public", 1969, 4.55, True,
        "https://www.jnu.ac.in", logo("jnu.ac.in"), cover(7),
        "₹300-5,000/year", "NAAC A++ | UGC | Central University",
        ["MA", "M.Sc", "M.Phil", "MBA (International Business)", "LL.M", "Ph.D", "Certificate Programs"], 9
    ),
    (
        "Banaras Hindu University",
        "BHU, founded by Madan Mohan Malaviya in 1916, is Asia's largest residential university. Its 1,300-acre campus in the holy city of Varanasi houses 14 faculties, 140 departments, 6 institutes, and over 130,000 students. It is known for Ayurveda, Sanskrit, visual arts, and engineering education.",
        "Varanasi", "Uttar Pradesh", "Public", 1916, 4.45, True,
        "https://www.bhu.ac.in", logo("bhu.ac.in"), cover(8),
        "₹10K-50K/year", "NAAC A++ | UGC | Central University",
        ["B.Sc", "B.Tech", "MBBS", "BA", "B.Com", "LLB", "BFA", "MA", "M.Sc", "MBA", "Ph.D"], 5
    ),
    (
        "University of Hyderabad",
        "UoH is a premier central university renowned for its interdisciplinary research culture and beautiful 2,300-acre campus. It has strong schools of life sciences, physics, mathematics, and social sciences. Alumni include prize-winning scientists, IAS officers, and award-winning filmmakers.",
        "Hyderabad", "Telangana", "Public", 1974, 4.42, False,
        "https://uohyd.ac.in", logo("uohyd.ac.in"), cover(9),
        "₹10K-60K/year", "NAAC A++ | UGC Category I",
        ["MA", "M.Sc", "M.Tech", "MCA", "MBA", "LL.M", "M.Phil", "Ph.D"], 10
    ),
    (
        "Jadavpur University",
        "Jadavpur University is West Bengal's most respected research university and one of India's best. Founded through a student movement for Swaraj, its engineering faculty consistently ranks among India's top 5. Jadavpur's PhDs and alumni hold positions in Stanford, MIT, and NASA.",
        "Kolkata", "West Bengal", "Public", 1955, 4.50, True,
        "https://jadavpuruniversity.in", logo("jadavpuruniversity.in"), cover(10),
        "₹20K-80K/year", "NAAC A++ | UGC | NIRF Top 15",
        ["B.E.", "B.Tech", "B.Arch", "BA", "B.Sc", "B.Pharm", "MA", "M.Sc", "M.E.", "Ph.D"], 8
    ),
    (
        "Jamia Millia Islamia",
        "Jamia Millia Islamia, born from the Non-Cooperation Movement, is a prestigious central university in New Delhi. Known for its Mass Communication, Engineering, Law, and Architecture schools. It has produced notable journalists, architects, judges, and IAS officers.",
        "New Delhi", "Delhi", "Public", 1920, 4.30, False,
        "https://www.jmi.ac.in", logo("jmi.ac.in"), cover(11),
        "₹15K-50K/year", "NAAC A+ | UGC | Central University",
        ["B.Tech", "B.Arch", "LLB", "BFA", "BA", "B.Sc", "MA", "M.Tech", "MBA", "Ph.D"], 16
    ),
    (
        "Aligarh Muslim University",
        "AMU, chartered in 1875, is one of India's oldest and most respected central universities. Its historic campus in Aligarh houses 12 faculties, 1 satellite campus, and 300+ departments. Known for Unani medicine, law, engineering, and management education with a global alumni network.",
        "Aligarh", "Uttar Pradesh", "Public", 1875, 4.30, False,
        "https://www.amu.ac.in", logo("amu.ac.in"), cover(0),
        "₹10K-40K/year", "NAAC A++ | UGC | Central University",
        ["MBBS", "B.Tech", "LLB", "BBA", "BA", "B.Sc", "B.Com", "MA", "M.Sc", "MBA", "Ph.D"], 17
    ),
    (
        "Panjab University",
        "One of India's grand old universities, Panjab University was established during the British era and moved to Chandigarh after partition. It is recognized for law, pharmaceutical sciences, humanities, and management education across a sprawling 500-acre campus designed by Le Corbusier.",
        "Chandigarh", "Chandigarh", "Public", 1947, 4.22, False,
        "https://puchd.ac.in", logo("puchd.ac.in"), cover(1),
        "₹15K-80K/year", "NAAC A | UGC | AIU",
        ["BA", "B.Sc", "B.Com", "LLB", "MBA", "MCA", "M.Sc", "MA", "Ph.D"], 24
    ),
    (
        "Anna University",
        "Anna University, Chennai, is Tamil Nadu's apex technical university affiliating 540+ engineering colleges. Its main campus, CEG (founded 1794), is one of India's oldest engineering colleges. Strong in automobile, manufacturing, and computer science engineering.",
        "Chennai", "Tamil Nadu", "Public", 1978, 4.35, False,
        "https://www.annauniv.edu", logo("annauniv.edu"), cover(2),
        "₹1.5L-2L/year (B.E./B.Tech)", "NAAC A | UGC | Affiliating University",
        ["B.E.", "B.Tech", "B.Arch", "M.E.", "M.Tech", "MBA", "MCA", "Ph.D"], 28
    ),
    (
        "Savitribai Phule Pune University",
        "One of Maharashtra's foremost affiliating universities, SPPU connects 800+ colleges in Pune, Nashik, and Ahmednagar. Its main campus houses top-ranked science, management, and law faculties and is a hub for pharmaceutical and IT research.",
        "Pune", "Maharashtra", "Public", 1949, 4.20, False,
        "https://www.unipune.ac.in", logo("unipune.ac.in"), cover(3),
        "₹15K-80K/year", "NAAC A++ | UGC | Affiliating University",
        ["BA", "B.Sc", "B.Com", "B.Tech", "LLB", "MBA", "M.Sc", "MA", "Ph.D"], 25
    ),

    # ════════════ Business & Law ════════════
    (
        "XLRI – Xavier School of Management, Jamshedpur",
        "XLRI is India's oldest business school (1949) founded by Jesuit fathers with a mission of business for others. Its PGDM (BM) and PGDM (HRM) programs are among the most prestigious in Asia. Alumni occupy C-suite positions at Hindustan Unilever, Tata Group, and McKinsey globally.",
        "Jamshedpur", "Jharkhand", "Private", 1949, 4.75, True,
        "https://www.xlri.ac.in", logo("xlri.ac.in"), cover(4),
        "₹22L (2-yr PGDM)", "AACSB | EQUIS | AMBA Triple Accredited",
        ["PGDM (Business Management)", "PGDM (HRM)", "GMP", "Ph.D (FPM)", "Fellow Programme"], None
    ),
    (
        "SP Jain Institute of Management and Research",
        "Located in Mumbai's Andheri, SPJIMR is one of India's most innovative B-Schools, known for its PGDM, Global Management Programs, and a non-replication of knowledge philosophy. It mandates social immersion for all students.",
        "Mumbai", "Maharashtra", "Deemed", 1981, 4.60, False,
        "https://www.spjimr.org", logo("spjimr.org"), cover(5),
        "₹20L (2-yr PGDM)", "AACSB Accredited | NAAC A",
        ["PGDM", "PGDM (Global Business)", "PGDM (Executive)", "Ph.D (FPM)"], None
    ),
    (
        "Management Development Institute, Gurugram",
        "MDI Gurgaon is one of India's premier government-funded business schools, known for its rigor in strategy, finance, and HR management. Located in NCR's corporate hub, graduates join consulting, BFSI, and technology firms.",
        "Gurugram", "Haryana", "Private", 1973, 4.55, False,
        "https://www.mdi.ac.in", logo("mdi.ac.in"), cover(6),
        "₹19L (2-yr PGPM)", "AMBA Accredited | NAAC A",
        ["PGPM", "PGPM (HRM)", "NMP (National Management Programme)", "Ph.D (Fellow)"], None
    ),
    (
        "Indian School of Business",
        "ISB Hyderabad is India's highest globally-ranked business school, placing in Financial Times Global MBA rankings. Its one-year PGP is designed for experienced professionals, offering access to 175+ faculty from world's top 10 universities and unparalleled industry connections.",
        "Hyderabad", "Telangana", "Private", 2001, 4.80, True,
        "https://www.isb.edu", logo("isb.edu"), cover(7),
        "₹41L (1-yr PGP)", "AACSB | EQUIS Accredited | FT Top 30",
        ["PGP (MBA equivalent)", "PGPMAX (Executive)", "Ph.D", "Certificate Programs"], None
    ),
    (
        "Indian Institute of Foreign Trade",
        "IIFT, established by the Government of India, is the country's premier institution for international business and trade education. MBA (IB) graduates are sought by Tata International, Deloitte, and global trade bodies.",
        "New Delhi", "Delhi", "Public", 1963, 4.50, False,
        "https://iift.ac.in", logo("iift.ac.in"), cover(8),
        "₹16L (2-yr MBA IB)", "AACSB Accredited | UGC | Ministry of Commerce",
        ["MBA (International Business)", "Ph.D", "EMBA", "Certificate in Trade Policy"], None
    ),
    (
        "National Law School of India University",
        "NLSIU Bengaluru is India's most prestigious law school, consistently ranked #1 in NIRF Law. Founded to reform legal education, its 5-year BA LLB program attracts the country's top students through the CLAT exam. Alumni include Supreme Court judges, top lawyers, and legal academics.",
        "Bengaluru", "Karnataka", "Public", 1987, 4.72, True,
        "https://nls.ac.in", logo("nls.ac.in"), cover(9),
        "₹2.5L/year (LLB)", "NAAC A++ | Bar Council of India | UGC",
        ["BA LLB (Hons)", "LLM", "Ph.D", "Master of Public Policy"], 1
    ),
    (
        "NALSAR University of Law",
        "NALSAR Hyderabad is India's second-ranked law school, known for its strong human rights, corporate law, and IP law programs. Located on the Shameerpet campus, it boasts of a faculty drawn from India's top legal minds and international law firms.",
        "Hyderabad", "Telangana", "Public", 1998, 4.52, False,
        "https://nalsar.ac.in", logo("nalsar.ac.in"), cover(10),
        "₹2.2L/year (LLB)", "NAAC A | Bar Council of India | UGC",
        ["BA LLB (Hons)", "B.Com LLB", "LLM", "MBA (Law)", "Ph.D"], 2
    ),
    (
        "National Law University, Delhi",
        "NLU Delhi offers highly specialized law education with intensive research collaboration with the Supreme Court of India and a unique proximity to India's legal capital. Its LLM, Doctoral, and Prison Reform programs are nationally recognized.",
        "New Delhi", "Delhi", "Public", 2008, 4.50, False,
        "https://nludelhi.ac.in", logo("nludelhi.ac.in"), cover(11),
        "₹2L/year (LLB)", "NAAC A | Bar Council of India",
        ["BA LLB (Hons)", "LLM", "Ph.D", "Certificate Programs"], 3
    ),

    # ════════════ Technology & Design ════════════
    (
        "Thapar Institute of Engineering and Technology",
        "Thapar University, Patiala, is among India's best private technical universities with strong placements at 200+ companies. Known for its advanced labs in robotics, IoT, and bioinformatics, and a renowned alumni network in Silicon Valley.",
        "Patiala", "Punjab", "Deemed", 1956, 4.35, False,
        "https://www.thapar.edu", logo("thapar.edu"), cover(0),
        "₹3L-4L/year (B.E.)", "NAAC A | UGC | QS Top 801",
        ["B.E.", "B.Tech", "M.E.", "M.Sc", "MBA", "Ph.D"], None
    ),
    (
        "Delhi Technological University",
        "Formerly Delhi College of Engineering (est. 1941), DTU is one of the oldest and most respected state engineering universities in India. Located in Rohini, Delhi, it consistently places students in global tech companies.",
        "New Delhi", "Delhi", "Public", 1941, 4.28, False,
        "https://www.dtu.ac.in", logo("dtu.ac.in"), cover(1),
        "₹1.8L/year (B.Tech)", "NAAC A | UGC | Delhi State University",
        ["B.Tech", "M.Tech", "M.Sc", "MBA", "Ph.D"], 46
    ),
    (
        "National Institute of Fashion Technology, Delhi",
        "NIFT Delhi, the flagship campus of India's premier fashion education institution, is the alma mater of leading fashion designers, retail managers, and apparel entrepreneurs. It offers undergraduate and postgraduate programs in design, management, and technology.",
        "New Delhi", "Delhi", "Public", 1986, 4.50, True,
        "https://www.nift.ac.in", logo("nift.ac.in"), cover(2),
        "₹1.2L-2L/year", "Ministry of Textiles | NAAC A",
        ["B.Des", "B.FTech", "Master of Fashion Management", "M.Des", "Ph.D"], None
    ),
    (
        "National Institute of Design, Ahmedabad",
        "NID Ahmedabad is Asia's foremost design institution and one of the finest design schools globally. Established on the recommendations of Charles and Ray Eames' India Report, it has shaped Indian product design, communication design, and design policy for 60 years.",
        "Ahmedabad", "Gujarat", "Deemed", 1961, 4.65, True,
        "https://www.nid.edu", logo("nid.edu"), cover(3),
        "₹2L-2.5L/year", "NAAC A++ | Ministry of Commerce | UGC Deemed",
        ["B.Des", "M.Des", "Ph.D", "P.G. Diploma"], None
    ),

    # ════════════ IISERs ════════════
    (
        "Indian Institute of Science Education and Research, Pune",
        "IISER Pune is dedicated to science education and research at the highest levels. Its BS-MS dual degree program produces world-class scientists who go on to top global PhD programs. Faculty publication rates and citation counts rival IISc and IIT Bombay.",
        "Pune", "Maharashtra", "Public", 2006, 4.62, True,
        "https://www.iiserpune.ac.in", logo("iiserpune.ac.in"), cover(4),
        "₹35K/year (BS-MS)", "Institute of National Importance | UGC | NAAC A",
        ["BS-MS Dual Degree", "Ph.D", "Integrated Ph.D", "M.Sc"], 41
    ),
    (
        "Indian Institute of Science Education and Research, Kolkata",
        "IISER Kolkata on the Nadia campus is known for its vibrant research culture in theoretical physics, chemical biology, and computational science, building on Kolkata's storied scientific heritage.",
        "Kolkata", "West Bengal", "Public", 2006, 4.52, False,
        "https://www.iiserkol.ac.in", logo("iiserkol.ac.in"), cover(5),
        "₹35K/year (BS-MS)", "Institute of National Importance | UGC",
        ["BS-MS Dual Degree", "Ph.D", "Integrated Ph.D"], 42
    ),
    (
        "Indian Institute of Science Education and Research, Mohali",
        "IISER Mohali in Punjab focuses on frontier science research and fostering original scientific thinking. Its structured PhD programs have attracted prominent international collaborations with Cambridge, Oxford, and Max Planck institutes.",
        "Mohali", "Punjab", "Public", 2007, 4.45, False,
        "https://www.iisermohali.ac.in", logo("iisermohali.ac.in"), cover(6),
        "₹35K/year (BS-MS)", "Institute of National Importance | UGC",
        ["BS-MS Dual Degree", "Ph.D", "Integrated Ph.D"], 43
    ),
    (
        "Indian Institute of Science Education and Research, Bhopal",
        "IISER Bhopal pursues excellence in science education and interdisciplinary research. It has established collaborations with leading international research universities and is building strength in energy, environmental, and biomedical sciences.",
        "Bhopal", "Madhya Pradesh", "Public", 2008, 4.35, False,
        "https://www.iiserb.ac.in", logo("iiserb.ac.in"), cover(7),
        "₹35K/year (BS-MS)", "Institute of National Importance | UGC",
        ["BS-MS Dual Degree", "Ph.D", "Integrated Ph.D"], 44
    ),
    (
        "Indian Institute of Science Education and Research, Thiruvananthapuram",
        "IISER TVM in Kerala's capital contributes to marine biology, tropical ecology, and photonics research alongside core science programs. Its scenic campus near the Western Ghats inspires environmental consciousness.",
        "Thiruvananthapuram", "Kerala", "Public", 2008, 4.28, False,
        "https://iisertvm.ac.in", logo("iisertvm.ac.in"), cover(8),
        "₹35K/year (BS-MS)", "Institute of National Importance | UGC",
        ["BS-MS Dual Degree", "Ph.D", "Integrated Ph.D"], 45
    ),

    # ════════════ Premier Research Institutes ════════════
    (
        "Indian Statistical Institute, Kolkata",
        "ISI Kolkata, established by Prof. P.C. Mahalanobis, is among the world's foremost centers for statistics, mathematics, and computer science. Alumni include Fields Medal winners, Padma Bhushan awardees, and directors of global financial institutions.",
        "Kolkata", "West Bengal", "Public", 1931, 4.72, True,
        "https://www.isical.ac.in", logo("isical.ac.in"), cover(9),
        "₹50K/year (B.Stat)", "National Institute of Importance | UGC | DST",
        ["B.Stat", "B.Math", "M.Stat", "M.Math", "MS (QE)", "Ph.D"], None
    ),
    (
        "Tata Institute of Fundamental Research",
        "TIFR Mumbai is India's premier institution for basic research in mathematics, physics, chemistry, biology, and computer science. Established with Homi Bhabha's vision of world-class Indian science, it has nurtured Nobel Prize-caliber research for 80 years.",
        "Mumbai", "Maharashtra", "Public", 1945, 4.82, True,
        "https://www.tifr.res.in", logo("tifr.res.in"), cover(10),
        "No UG Tuition | Ph.D Stipend Provided", "DST | DAE | National Centre for Basic Sciences",
        ["Integrated M.Sc–Ph.D", "Ph.D", "Visiting Student Research Programme"], None
    ),

    # ════════════ Liberal Arts, Commerce & Others ════════════
    (
        "Loyola College, Chennai",
        "Loyola College is Chennai's most prestigious autonomous arts and science college, affiliated to the University of Madras. Founded by Jesuit priests, it offers an enlightened education system blending academic excellence with character formation. It is ranked among India's top 5 colleges by NIRF.",
        "Chennai", "Tamil Nadu", "Private", 1925, 4.42, True,
        "https://loyolacollege.edu", logo("loyolacollege.edu"), cover(11),
        "₹25K-80K/year", "NAAC A++ | Autonomous college | AIU",
        ["BA", "B.Sc", "B.Com", "BCA", "BBA", "MA", "M.Sc", "M.Com", "Ph.D"], 2
    ),
    (
        "Christ University, Bengaluru",
        "Christ University is a deemed university in the heart of Bengaluru, known for excellence across law, commerce, science, engineering, and humanities. Its strong industry connections, active student exchange programs with 200+ global universities, and vibrant campus make it a top choice.",
        "Bengaluru", "Karnataka", "Deemed", 1969, 4.32, False,
        "https://www.christuniversity.in", logo("christuniversity.in"), cover(0),
        "₹1L-3.5L/year", "NAAC A++ | UGC Category I",
        ["BA", "B.Sc", "B.Com", "BBA", "B.Tech", "LLB", "MBA", "MA", "M.Sc", "Ph.D"], None
    ),
    (
        "Miranda House, New Delhi",
        "Miranda House is India's #1 ranked college by NIRF College category. This women's college under Delhi University is legendary for producing India's top civil servants, scientists, writers, and social activists. Its debate culture, research output, and alumni network are unmatched among undergraduate colleges.",
        "New Delhi", "Delhi", "Public", 1948, 4.65, True,
        "https://mirandahouse.ac.in", logo("mirandahouse.ac.in"), cover(1),
        "₹15K-40K/year", "NAAC A++ | DU Autonomous | NIRF #1 College",
        ["BA (Hons)", "B.Sc (Hons)", "MA", "M.Sc", "Ph.D"], 1
    ),
    (
        "Ashoka University",
        "Ashoka University is India's first liberal arts and sciences university modelled on global top-10 US liberal arts colleges. With an extraordinary faculty including former senior UN officials, Pulitzer winners, and global economists, it offers transformative undergraduate education focused on critical thinking.",
        "Sonipat", "Haryana", "Private", 2014, 4.52, True,
        "https://www.ashoka.edu.in", logo("ashoka.edu.in"), cover(2),
        "₹12L-16L/year", "NAAC A | UGC | Liberal Arts Institution",
        ["B.Sc (Research)", "BA (Research)", "MA", "M.Sc", "Ph.D", "Economics", "Psychology", "Computer Science"], None
    ),
    (
        "OP Jindal Global University",
        "JGU Sonipat is India's only university consistently ranked in QS World Top 1000. Founded by institutions established by O.P. Jindal Group, it offers world-class legal, global affairs, business, journalism, and public policy education with a faculty 60% of whom hold degrees from Oxford, Harvard, or Cambridge.",
        "Sonipat", "Haryana", "Deemed", 2009, 4.42, False,
        "https://jgu.edu.in", logo("jgu.edu.in"), cover(3),
        "₹4L-9L/year", "NAAC A | UGC | QS Top 1000",
        ["BA LLB", "BBA LLB", "LLM", "BA (Global Affairs)", "MBA", "BBA", "MA", "Ph.D"], None
    ),
    (
        "Shiv Nadar University",
        "Shiv Nadar University in Greater Noida is a research-intensive university modeled on a US university structure. Established by HCL founder Shiv Nadar, it emphasizes interdisciplinary research and offers generous scholarships. Known for its engineering, natural sciences, and humanities programs.",
        "Greater Noida", "Uttar Pradesh", "Deemed", 2011, 4.32, False,
        "https://snu.edu.in", logo("snu.edu.in"), cover(4),
        "₹3L-5L/year", "NAAC A | UGC | QS Top 1000",
        ["B.Tech", "B.Sc", "BA", "B.Com", "M.Tech", "MBA", "MA", "M.Sc", "Ph.D"], None
    ),
    (
        "Presidency University, Kolkata",
        "One of India's oldest and most storied higher education institutions (est. 1817 as Hindu College), Presidency University Kolkata has produced two Nobel laureates — Rabindranath Tagore and Amartya Sen — along with countless distinguished scientists, politicians, and artists.",
        "Kolkata", "West Bengal", "Public", 1817, 4.45, True,
        "https://www.presiuniv.ac.in", logo("presiuniv.ac.in"), cover(5),
        "₹10K-50K/year", "NAAC A | UGC | Autonomous State University",
        ["BA", "B.Sc", "MA", "M.Sc", "Ph.D"], None
    ),
    (
        "University of Mumbai",
        "The University of Mumbai, established in 1857 as one of the first three modern universities in India, is Maharashtra's principal affiliating university. It oversees 711+ colleges across Mumbai, Thane, and Raigad, offering programs in every academic discipline.",
        "Mumbai", "Maharashtra", "Public", 1857, 4.22, False,
        "https://mu.ac.in", logo("mu.ac.in"), cover(6),
        "₹10K-1L/year", "NAAC A | UGC | AIU | Affiliating University",
        ["BA", "B.Sc", "B.Com", "BMS", "BMM", "LLB", "MBA", "M.Sc", "MA", "Ph.D"], None
    ),
]


# ─── DB connection ─────────────────────────────────────────────────────────────
def get_connection():
    """
    Try TRANSACTION_POOLER_URL first (Render-compatible, IPv4).
    Fall back to DATABASE_URL (works locally with direct Supabase connection).
    Strips whitespace and handles URL-encoded passwords.
    """
    raw_url = (
        os.getenv("TRANSACTION_POOLER_URL") or
        os.getenv("DATABASE_URL")
    )

    if not raw_url:
        print("❌  No DB URL found.")
        print("    Set TRANSACTION_POOLER_URL or DATABASE_URL in backend/.env")
        sys.exit(1)

    url = raw_url.strip()  # Remove trailing spaces/newlines from .env

    # Parse host/port for display only
    parsed = urlparse(url)
    print(f"🔌  Connecting to: {parsed.hostname}:{parsed.port}")

    # Build clean DSN by explicitly decoding credentials
    # This avoids psycopg2 mishandling special chars in passwords
    password = unquote(parsed.password or "")
    username = unquote(parsed.username or "")
    dbname = (parsed.path or "/postgres").lstrip("/").strip()
    host = parsed.hostname
    port = parsed.port or 5432

    return psycopg2.connect(
        host=host,
        port=port,
        dbname=dbname,
        user=username,
        password=password,
        sslmode="require",
        connect_timeout=15,
    )


# ─── Schema migration (adds missing cols if not exist) ─────────────────────────
MIGRATION_SQL = """
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS fee_structure VARCHAR(200);
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS affiliation   VARCHAR(300);
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS courses       TEXT[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS nirf_rank     INT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_colleges_name_unique ON colleges (name);
"""

# ─── Insert SQL ────────────────────────────────────────────────────────────────
INSERT_SQL = """
INSERT INTO colleges
  (name, description, city, state, country, type, established_year,
   rating, is_featured, website, logo_url, cover_image_url,
   fee_structure, affiliation, courses, nirf_rank)
VALUES %s
ON CONFLICT (name) DO UPDATE SET
  description       = EXCLUDED.description,
  city              = EXCLUDED.city,
  state             = EXCLUDED.state,
  type              = EXCLUDED.type,
  established_year  = EXCLUDED.established_year,
  rating            = EXCLUDED.rating,
  is_featured       = EXCLUDED.is_featured,
  website           = EXCLUDED.website,
  logo_url          = EXCLUDED.logo_url,
  cover_image_url   = EXCLUDED.cover_image_url,
  fee_structure     = EXCLUDED.fee_structure,
  affiliation       = EXCLUDED.affiliation,
  courses           = EXCLUDED.courses,
  nirf_rank         = EXCLUDED.nirf_rank,
  updated_at        = NOW();
"""


def main():
    print("=" * 60)
    print("  Zpluse University — College Seed Script")
    print(f"  Total colleges to insert/update: {len(COLLEGES)}")
    print("=" * 60)

    conn = get_connection()
    conn.autocommit = False
    cur = conn.cursor()

    # Step 1: Migrate schema
    print("\n📐  Applying schema migration...")
    cur.execute(MIGRATION_SQL)
    print("    ✅  Columns added (or already exist)")

    # Step 2: Build rows
    rows = []
    for c in COLLEGES:
        (name, description, city, state, ctype, est_year, rating, featured,
         website, logo_url, cover_url, fee, affiliation, courses, nirf_rank) = c
        rows.append((
            name, description, city, state, "India", ctype, est_year,
            rating, featured, website, logo_url, cover_url,
            fee, affiliation, courses, nirf_rank
        ))

    # Step 3: Insert using execute_values for efficiency
    print(f"\n📥  Inserting {len(rows)} college records...")
    execute_values(cur, INSERT_SQL, rows)

    conn.commit()
    cur.close()
    conn.close()

    print(f"\n✅  Done! {len(rows)} colleges inserted/updated successfully.")
    print("\n🌐  Visit your site to verify:")
    print("    https://www.zpluseuniversity.com/colleges\n")


if __name__ == "__main__":
    main()

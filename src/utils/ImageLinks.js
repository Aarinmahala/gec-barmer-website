/**
 * Central repository for all image links used in the website
 * This makes it easier to manage and update image URLs in one place
 */

const ImageLinks = {
  // Logo & Common Images
  logo: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747061105/logo512_c07sdw.png",
  secondLogo: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747075623/MBM_diwmsr.jpg",
  placeholder: "/images/placeholder.jpg",
  facultyPlaceholder: "/images/faculty-placeholder.jpg",
  
  // Home Page
  aboutCollege: "/images/about-college.jpg",
  homeHero: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747592570/campus-hero_zmunhk.jpg",
  
  // Carousel Images for Homepage
  carousel: [
    "https://res.cloudinary.com/dewhmewqy/image/upload/v1747061992/colleg_jumkke.jpg", // Campus building
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg", // Library/Study area
    "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg", // Lab/Research
    "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg", // Students collaborating
    "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg" // Library interior
  ],
  
  // Leadership
  principal: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747073594/305009840_1119703905648281_7765544022572070549_n_1_ajzme6.jpg",
  
  // Department Images
  departments: {
    cse: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747061992/colleg_jumkke.jpg",
    civil: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg",
    electrical: "https://images.pexels.com/photos/442151/pexels-photo-442151.jpeg",
    electronics: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
    mechanical: "https://images.pexels.com/photos/3846517/pexels-photo-3846517.jpeg",
    petroleum: "https://images.pexels.com/photos/6495511/pexels-photo-6495511.jpeg"
  },
  
  // Faculty Images (using placeholder links)
  faculty: {
    // CSE Department
    "aditya-sharma": "/images/faculty/aditya-sharma.jpg",
    "priya-patel": "/images/faculty/priya-patel.jpg",
    "rahul-verma": "/images/faculty/rahul-verma.jpg",
    
    // Chemical Department
    "rajesh-mehra": "/images/faculty/rajesh-mehra.jpg",
    "neha-singh": "/images/faculty/neha-singh.jpg",
    "vijay-kumar": "/images/faculty/vijay-kumar.jpg",
    
    // Civil Department
    "sunil-patil": "https://randomuser.me/api/portraits/men/7.jpg",
    "anjali-gupta": "https://randomuser.me/api/portraits/women/8.jpg",
    "manoj-sharma": "https://randomuser.me/api/portraits/men/9.jpg",
    
    // Electrical Department
    "anand-joshi": "https://randomuser.me/api/portraits/men/10.jpg",
    "sunita-sharma": "https://randomuser.me/api/portraits/women/11.jpg",
    "deepak-singh": "https://randomuser.me/api/portraits/men/12.jpg",
    
    // Electronics Department
    "rakesh-mishra": "https://randomuser.me/api/portraits/men/13.jpg",
    "kavita-patel": "https://randomuser.me/api/portraits/women/14.jpg",
    "sanjay-kumar": "https://randomuser.me/api/portraits/men/15.jpg",
    
    // Mechanical Department
    "prakash-sharma": "https://randomuser.me/api/portraits/men/16.jpg",
    "meena-agarwal": "https://randomuser.me/api/portraits/women/17.jpg",
    "alok-singh": "https://randomuser.me/api/portraits/men/18.jpg",
    
    // Petroleum Department
    "ramesh-yadav": "https://randomuser.me/api/portraits/men/19.jpg",
    "pooja-sharma": "https://randomuser.me/api/portraits/women/20.jpg",
    "dinesh-kumar": "https://randomuser.me/api/portraits/men/21.jpg",
    
    // Add default faculty placeholder image
    "default": "/images/faculty/default-faculty.jpg"
  },
  
  // Industry Associations
  associations: {
    risu: "https://static.wixstatic.com/media/b68766_3e0ef1a2f92b4f10aa4093adee06505e~mv2.png",
    kamtech: "https://www.kamtech.in/frontend/images/Kamtech-Group.png",
    vedanta: "https://www.vedantalimited.com/img/vedanta-logo.svg",
    jsw: "https://www.jsw.in/sites/all/themes/jsw_theme/images/logos/jsw.png",
    ultratech: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747656431/ultratech-cement-logo_neguxd.png",
  },
  
  // Facilities
  facilities: {
    library: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747740546/IMG_20181213_140520-scaled_awp9dj.webp",
    computerLab: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg",
    hostel: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747740546/IMG_20181213_140520-scaled_awp9dj.webp",
    cafeteria: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    sportsComplex: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg",
    auditorium: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
  },
  
  // NSS Page
  nss: {
    hero: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747647515/WhatsApp_Image_2025-05-19_at_14.48.00_efa5abeb_rj8ecx.jpg",
    secondary: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747648071/600_400_px0zck.jpg",
    album: [
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646874/01_j4ego9.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747649863/18_uvsjtk.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646869/02_xymyk7.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747643292/IMG_20250519_040130_vmtzq4.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747643295/IMG_20250519_040202_guet7n.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747643295/IMG_20250519_040047_xftlm6.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747643293/IMG_20250519_040227_vbpiid.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747643295/IMG_20250519_035831_zymf4k.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747643295/IMG_20250519_035852_ozdzww.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646871/03_epmdpv.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646870/07_wk7gmd.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646870/12_fwlbzg.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646872/13_f5xsa4.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646872/10_gjnueh.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646868/04_prbent.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646874/08_jlyqbe.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646873/11_uiczit.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747646873/09_plhbqf.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747649863/19_t0di9i.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747649864/17_afj4eg.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747649862/16_at7bv4.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747642642/IMG_20250519_134438_bch86o.jpg"
    ]
  },
  
  // NCC Page
  ncc: {
    hero: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747590491/IMG_2252_utzelc.jpg",
    secondary: "https://res.cloudinary.com/dewhmewqy/image/upload/v1747600940/WhatsApp_Image_2024-11-16_at_04.07.56_cba0a98e_uwcvmg.jpg",
    album: [
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747601947/IMG_20250126_093055334_HDR_AE_b5p81h.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605523/IMG_20250126_112031_r9o09u.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747595747/IMG_2021_bgciae.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747602254/IMG_2095_godklc.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747603365/IMG_2102_amwgx0.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747595746/IMG_20250126_092043996_HDR_AE_nlbowt.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747595629/IMG_20250126_092430598_HDR_AE_sggwgq.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747595622/IMG_1926_jwcxeg.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747601905/IMG_2218_i50rxb.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747601918/IMG_2231_cnxmon.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747603543/IMG_2014_xd25k0.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747595751/IMG_2257_hrvfpc.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747595630/IMG_2326_inzga4.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747151769/IMG_20241018_084128_m2fths.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747595744/IMG_1984_l5hlvx.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605605/IMG_20250126_110841_1_vsn11q.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605604/IMG_2149_mxazt9.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605605/IMG_1981_k9nmqb.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605604/IMG_2182_qtdt1a.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605605/IMG_20250127_000756_varvpo.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605604/IMG_1944_u100ca.jpg",
      "https://res.cloudinary.com/dewhmewqy/image/upload/v1747605602/IMG_20250519_031501_wianzc.jpg"
    ]
  },
  
  // Gallery
  gallery: [
    "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
    "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg",
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    "https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg",
    "https://images.pexels.com/photos/3760513/pexels-photo-3760513.jpeg",
    "https://images.pexels.com/photos/3812743/pexels-photo-3812743.jpeg",
    "https://images.pexels.com/photos/2305098/pexels-photo-2305098.jpeg",
    "https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg",
    "https://images.pexels.com/photos/5940839/pexels-photo-5940839.jpeg",
    "https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg",
    "https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg",
    "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg"
  ],
  
  // Student Events
  events: [
    "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
    "https://images.pexels.com/photos/7648080/pexels-photo-7648080.jpeg",
    "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    "https://images.pexels.com/photos/3321797/pexels-photo-3321797.jpeg",
    "https://images.pexels.com/photos/3321790/pexels-photo-3321790.jpeg"
  ]
};

export default ImageLinks; 
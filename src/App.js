import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/global.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Principal from './pages/Principal';
import Registrar from './pages/Registrar';
import ViceChancellor from './pages/ViceChancellor';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Courses from './pages/Courses';
import Leadership from './pages/Leadership';
import Gallery from './pages/Gallery';
import StudentClubs from './pages/StudentClubs';
import Academics from './pages/Academics';
import Contact from './pages/Contact';
import IndustryAssociations from './pages/IndustryAssociations';
import Admission from './pages/Admission';
import Announcements from './pages/Announcements';
import NSS from './pages/NSS';
import NCC from './pages/NCC';
import AnnouncementManager from './pages/AnnouncementManager';
import LinkManager from './pages/LinkManager';
import LeadershipManager from './pages/LeadershipManager';
import ExportManager from './pages/ExportManager';
import BackupRestoreManager from './pages/BackupRestoreManager';
import FacultyManager from './pages/FacultyManager';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import { AnnouncementProvider } from './utils/AnnouncementContext';
import { LinkProvider } from './utils/LinkContext';
import { ImageLinkProvider } from './utils/ImageLinkContext';
import { LeadershipProvider } from './utils/LeadershipContext';
import { NCCProvider } from './utils/NCCContext';
import { NSSProvider } from './utils/NSSContext';
import { StudentClubsProvider } from './utils/StudentClubsContext';
import { FacultyProvider } from './utils/FacultyContext';
import NCCManager from './pages/NCCManager';
import NSSManager from './pages/NSSManager';
import StudentClubsManager from './pages/StudentClubsManager';
import Faculty from './pages/Faculty';
import StudentActivityCouncil from './pages/StudentActivityCouncil';
import Library from './pages/Library';
import Hostel from './pages/Hostel';
import TPCell from './pages/TPCell';
import WebTeam from './pages/WebTeam';
import MediaCoverage from './pages/MediaCoverage';
import Tenders from './pages/Tenders';
import Careers from './pages/Careers';
import Syllabus from './pages/Syllabus';

// Google OAuth Client ID from environment variables or use a provided client ID
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "296532971829-od3so2gamri105o4kuf4sa9945apu2ut.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <AnnouncementProvider>
            <LinkProvider>
              <ImageLinkProvider>
                <LeadershipProvider>
                  <NCCProvider>
                    <NSSProvider>
                      <StudentClubsProvider>
                        <FacultyProvider>
                          <div className="App">
                            <Header />
                            <main>
                              <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<AboutUs />} />
                                <Route path="/principal" element={<Principal />} />
                                <Route path="/registrar" element={<Registrar />} />
                                <Route path="/vice-chancellor" element={<ViceChancellor />} />
                                <Route path="/departments" element={<Departments />} />
                                <Route path="/departments/:id" element={<DepartmentDetail />} />
                                <Route path="/courses" element={<Courses />} />
                                <Route path="/leadership" element={<Leadership />} />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route path="/student-clubs" element={<StudentClubs />} />
                                <Route path="/academics" element={<Academics />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/industry-associations" element={<IndustryAssociations />} />
                                <Route path="/admission" element={<Admission />} />
                                <Route path="/announcements" element={<Announcements />} />
                                <Route path="/nss" element={<NSS />} />
                                <Route path="/ncc" element={<NCC />} />
                                <Route path="/faculty" element={<Faculty />} />
                                <Route path="/student-activity-council" element={<StudentActivityCouncil />} />
                                <Route path="/library" element={<Library />} />
                                <Route path="/hostel" element={<Hostel />} />
                                <Route path="/tp-cell" element={<TPCell />} />
                                <Route path="/web-team" element={<WebTeam />} />
                                <Route path="/media-coverage" element={<MediaCoverage />} />
                                <Route path="/tenders" element={<Tenders />} />
                                <Route path="/careers" element={<Careers />} />
                                <Route path="/academics/syllabus" element={<Syllabus />} />
                                
                                {/* Admin Routes */}
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route 
                                  path="/admin/faculty" 
                                  element={
                                    <ProtectedRoute>
                                      <FacultyManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/announcements" 
                                  element={
                                    <ProtectedRoute>
                                      <AnnouncementManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/links" 
                                  element={
                                    <ProtectedRoute>
                                      <LinkManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/leadership" 
                                  element={
                                    <ProtectedRoute>
                                      <LeadershipManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/export" 
                                  element={
                                    <ProtectedRoute>
                                      <ExportManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/backup" 
                                  element={
                                    <ProtectedRoute>
                                      <BackupRestoreManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/ncc" 
                                  element={
                                    <ProtectedRoute>
                                      <NCCManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/nss" 
                                  element={
                                    <ProtectedRoute>
                                      <NSSManager />
                                    </ProtectedRoute>
                                  } 
                                />
                                <Route 
                                  path="/admin/student-clubs" 
                                  element={
                                    <ProtectedRoute>
                                      <StudentClubsManager />
                                    </ProtectedRoute>
                                  } 
                                />
                              </Routes>
                            </main>
                            <Footer />
                          </div>
                        </FacultyProvider>
                      </StudentClubsProvider>
                    </NSSProvider>
                  </NCCProvider>
                </LeadershipProvider>
              </ImageLinkProvider>
            </LinkProvider>
          </AnnouncementProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import { InfiniteMovingCards } from "./components/ui/infinite-moving-cards";
import { InteractiveInput } from "@/components/ui/interactive-input";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { NoiseBackground } from "@/components/ui/noise-background";
import { LoginForm } from "@/components/ui/loginform";
import { SignupForm } from "@/components/ui/signupform";
import GlobeSection from "@/components/GlobeSection";
import StatsCount from "@/components/ui/statscount";
import ThemeSwitchIcon from "@/components/ThemeSwitchIcon";
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconBulb,
  IconHistory,
  IconLayoutDashboard,
  IconArrowLeft,
  IconX
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const API = "http://localhost:8000/api/v1";

const testimonials = [
  {
    title: "TechFlow",
    href: "https://twitter.com/mannupaaji",
    heading: "Startup Idea",
    description: "This platform sparked the idea for my startup. The AI suggestions are incredibly detailed!",
  },
  {
    title: "DevPortfolio",
    href: "https://twitter.com/mannupaaji",
    heading: "Portfolio Builder",
    description: "I was stuck in a tutorial hell until I found this. Now I'm building real projects.",
  },
  {
    title: "IdeaTracker",
    href: "https://twitter.com/mannupaaji",
    heading: "Product Management",
    description: "The project history feature helps me keep track of all my crazy ideas.",
  },
  {
    title: "CreativeUI",
    href: "https://twitter.com/mannupaaji",
    heading: "UX Design",
    description: "Love the dark mode and the smooth UI. It makes brainstorming so much fun.",
  },
  {
    title: "BlockChainZ",
    href: "https://twitter.com/mannupaaji",
    heading: "Hackathon Winner",
    description: "Generated a blockchain idea that won me a hackathon. Highly recommended!",
  },
];

const stats = [
  { value: 30, suffix: "+", label: "Better Tech-Stack" },
  { value: 12, suffix: "K+", label: "Developers building with Project-Vision" },
  { value: 99, suffix: "%", label: "Performance optimized for web" },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authView, setAuthView] = useState("login"); // "login" or "signup"
  const [userId, setUserId] = useState("");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("random"); // 'random', 'custom', 'history', 'result'
  const [history, setHistory] = useState([]);

  // Form State for Custom Ideas
  const [formData, setFormData] = useState({
    interests: "",
    tech_stack: "",
    goal: "Portfolio",
    experience_level: "Intermediate",
  });

  // Details State
  const [details, setDetails] = useState({
    techStack: null,
    architecture: null,
    guidance: null,
    resources: null,
    team: null,
    imagePrompt: null,
    externalLinks: null,
  });

  const generateRandomProject = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/project-idea`);
      setUserId(res.data.user_id);
      setProject(res.data);
      resetDetails();
      setMode("result");
    } catch (err) {
      console.error(err);
      alert("Failed to generate project");
    } finally {
      setLoading(false);
    }
  };

  const generateCustomProject = async () => {
    setLoading(true);
    try {
      const payload = {
        interests: formData.interests.split(",").map((s) => s.trim()).filter(Boolean),
        tech_stack: formData.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
        goal: formData.goal,
        experience_level: formData.experience_level,
      };
      
      const res = await axios.post(`${API}/preferences`, payload);
      setUserId(res.data.user_id);
      setProject(res.data);
      resetDetails();
      setMode("result");
    } catch (err) {
      console.error(err);
      alert("Failed to generate custom project");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch history");
    }
  };

  // Load history when entering history mode
  useEffect(() => {
    if (mode === "history") {
      fetchHistory();
    }
  }, [mode]);

  const loadFromHistory = (item) => {
    setUserId(item.user_id);
    setProject(item);
    resetDetails();
    setMode("result");
  };

  const resetDetails = () => {
    setDetails({
      techStack: null,
      architecture: null,
      guidance: null,
      resources: null,
      team: null,
      imagePrompt: null,
      externalLinks: null,
    });
  };

  const fetchDetail = async (endpoint, key) => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API}/${endpoint}/${userId}`);
      setDetails((prev) => ({ ...prev, [key]: res.data }));
    } catch (err) {
      console.error(err);
      alert(`Failed to fetch ${key}`);
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
            <SidebarLink
              link={{
                label: "Profile",
                href: "#",
                icon: (
                  <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
                onClick: () => {
                  console.log("Profile clicked, opening login modal");
                  setAuthView("login");
                  setIsLoginOpen(true);
                },
              }}
            />
            </div>
            {open && <ThemeSwitchIcon />}
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 overflow-hidden relative">

          <div className="flex-1 overflow-auto p-6 z-10 relative">
             <div className="max-w-4xl mx-auto">
             <header className="mb-12 text-center">
                <div className="flex justify-center items-center mb-4">
                  <motion.div 
                    className="relative flex flex-col items-center justify-center gap-2 text-center sm:flex-row"> 
                    <LayoutTextFlip 
                      text="Project Vision" 
                      words={["Hub", "Engine", "Studio", "Architect"]}
                      className="text-4xl md:text-6xl gap-3"
                      boxClassName="px-4 py-2"
                    /> 
                  </motion.div>
                </div>
                <div className="mx-auto max-w-lg py-2 text-center">
                  <EncryptedText 
                    text="Generate unique software project ideas powered by ai." 
                    encryptedClassName="text-neutral-500" 
                    revealedClassName="dark:text-white text-black" 
                    revealDelayMs={50} />
                </div>
             </header>

            {/* Navigation */}
            <nav className="flex justify-center space-x-4 mb-8 items-center flex-wrap gap-y-4">
                <NoiseBackground
                  containerClassName="w-fit p-2 rounded-full"
                  gradientColors={["rgb(59, 130, 246)", "rgb(96, 165, 250)", "rgb(37, 99, 235)"]}
                >
                  <button
                    onClick={() => setMode("random")}
                    className={`h-full w-full cursor-pointer rounded-full bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)] ${mode === "random" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    🎲 Random Idea
                  </button>
                </NoiseBackground>

                <NoiseBackground
                  containerClassName="w-fit p-2 rounded-full"
                  gradientColors={["rgb(147, 51, 234)", "rgb(168, 85, 247)", "rgb(126, 34, 206)"]}
                >
                  <button
                    onClick={() => setMode("custom")}
                    className={`h-full w-full cursor-pointer rounded-full bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)] ${mode === "custom" ? "ring-2 ring-purple-500" : ""}`}
                  >
                    🎯 Custom Idea
                  </button>
                </NoiseBackground>

                <NoiseBackground
                  containerClassName="w-fit p-2 rounded-full"
                  gradientColors={["rgb(22, 163, 74)", "rgb(74, 222, 128)", "rgb(21, 128, 61)"]}
                >
                  <button
                    onClick={() => setMode("history")}
                    className={`h-full w-full cursor-pointer rounded-full bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)] ${mode === "history" ? "ring-2 ring-green-500" : ""}`}
                  >
                    📜 History
                  </button>
                </NoiseBackground>

                {project && (
                  <button
                    onClick={() => setMode("result")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      mode === "result"
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    👁️ Current Project
                  </button>
                )}
            </nav>

            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[300px]">
                
                {mode === "random" && (
                <div className="text-center py-8">
                    <p className="text-gray-400 mb-6">
                    Feeling adventurous? Let AI surprise you with a unique project idea.
                    </p>
                    <div onClick={generateRandomProject} className="cursor-pointer flex justify-center">
                        <InteractiveInput 
                            className="bg-green-500 text-white" 
                            variant="default" 
                            inputSize="default" 
                            glow={true} 
                            rounded="custom" 
                            hideAnimations={false} 
                            uppercase={true} 
                            textEffect="normal" 
                            shimmerColor="#39FF14" 
                            shimmerSize="0.15em" 
                            shimmerDuration="3s" 
                            borderRadius="100px" 
                            background="rgba(0, 0, 0, 1)" 
                            placeholder={loading ? "Generating..." : "Generate Random Idea"}
                            readOnly
                        />
                    </div>
                </div>
                )}

                {mode === "custom" && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Interests</label>
                        <input
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="e.g. AI, Blockchain"
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Tech Stack</label>
                        <input
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="e.g. React, Python"
                        value={formData.tech_stack}
                        onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Goal</label>
                        <select
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        >
                        <option>Portfolio</option>
                        <option>Startup MVP</option>
                        <option>Learning</option>
                        <option>Hackathon</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Experience Level</label>
                        <select
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        value={formData.experience_level}
                        onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                        >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        </select>
                    </div>
                    </div>
                    <button
                    onClick={generateCustomProject}
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/20 transition disabled:opacity-50 mt-4"
                    >
                    {loading ? "Generating Custom Idea..." : "Generate Custom Idea"}
                    </button>
                </div>
                )}

                {mode === "history" && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white mb-4">Past Projects</h2>
                    {history.length === 0 ? (
                    <p className="text-gray-500 italic">No history found.</p>
                    ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {history.map((item) => (
                        <div key={item.user_id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition border border-gray-700">
                            <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-blue-400">{item.project_title || item.title || "Untitled Project"}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                            </div>
                            <button 
                                onClick={() => loadFromHistory(item)}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm ml-4 whitespace-nowrap"
                            >
                                Load
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                )}



                {mode === "result" && project && (
                <div className="animate-fade-in">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold select-none pointer-events-none">
                        IDEA
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{project.project_title}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                    </div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailCard
                        title="Tech Stack"
                        icon="🧰"
                        onClick={() => fetchDetail("techstack", "techStack")}
                        data={details.techStack}
                    />
                    <DetailCard
                        title="Architecture"
                        icon="🏗️"
                        onClick={() => fetchDetail("architecture", "architecture")}
                        data={details.architecture}
                    />
                    <DetailCard
                        title="Guidance"
                        icon="🗺️"
                        onClick={() => fetchDetail("guidance", "guidance")}
                        data={details.guidance}
                    />
                    <DetailCard
                        title="Resources"
                        icon="📚"
                        onClick={() => fetchDetail("resources", "resources")}
                        data={details.resources}
                    />
                    <DetailCard
                        title="Team Roles"
                        icon="👥"
                        onClick={() => fetchDetail("team-match", "team")}
                        data={details.team}
                    />
                    <DetailCard
                        title="Image Prompt"
                        icon="🎨"
                        onClick={() => fetchDetail("image-prompt", "imagePrompt")}
                        data={details.imagePrompt}
                    />
                    <DetailCard
                        title="Similar Projects"
                        icon="🌐"
                        onClick={() => fetchDetail("external-links", "externalLinks")}
                        data={details.externalLinks}
                    />
                    </div>
                </div>
                )}
            </section>
            
          </div>
            <div className="h-[30rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden mt-10 w-full">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                    className="max-w-full"
                />
            </div>
            <GlobeSection />
            <StatsCount
              stats={stats}
              title="CREATE STUNNING IDEAS WITH PROJECT VISION"
              showDividers={true}
              className=""
            />
          </div>
      </div>

      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden">
             <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 z-[60] p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors border border-white/10"
            >
                <IconX className="h-5 w-5" />
            </button>
            {authView === "login" ? (
              <LoginForm 
                className="min-h-[85vh] bg-transparent" 
                onSignupClick={() => setAuthView("signup")}
              />
            ) : (
              <SignupForm 
                className="min-h-[85vh] bg-transparent" 
                onLoginClick={() => setAuthView("login")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        <LayoutTextFlip
          text="Project Vision"
          words={["Hub", "Studio", "Engine", "Architect"]}
          className="text-sm font-bold"
        />
      </motion.div>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

function DetailCard({ title, icon, onClick, data }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition group">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-200 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h3>
        {!data && (
          <button
            onClick={onClick}
            className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-400 px-3 py-1 rounded-full transition"
          >
            Generate
          </button>
        )}
      </div>
      
      {data ? (
        <div className="text-sm text-gray-400 max-h-40 overflow-y-auto custom-scrollbar">
          <pre className="whitespace-pre-wrap font-mono text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-xs text-gray-600 italic">Click generate to view details...</p>
      )}
    </div>
  );
}
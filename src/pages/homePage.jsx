import HeroSection from "../components/hero";
import About from "../components/aboutMe";
import Projects from "../components/projects";
import Jobs, {Education} from "../components/jobs";
import Skills from "../components/skills";


const Home = () => {
    return(
        <>
            <HeroSection />
            <About />
            <Projects />
            <Education />
            <Jobs />
            <Skills />
        </>
    )
}

export default Home;
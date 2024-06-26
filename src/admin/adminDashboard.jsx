import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Container,
  ImageList,
  ImageListItem,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";

import Content from "../components/shared/content";
import { ProjectCard } from "../components/projects";
import { storage } from "../firebase/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const unsubscribeProjects = onSnapshot(
      collection(db, "Projects"),
      (snapshot) => {
        const updatedList = snapshot.docs.map((doc) => doc.data());
        setProjects(updatedList);
        console.log(updatedList);
      }
    );

    const unsubscribeSkills = onSnapshot(
      collection(db, "Skills"),
      (snapshot) => {
        const updatedList = snapshot.docs
          .map((doc) => doc.data().skills)
          .flat();
        setSkills(updatedList);
        console.log(updatedList);
      }
    );

    const unsubscribeEducation = onSnapshot(
      collection(db, "Education"),
      (snapshot) => {
        const updatedList = snapshot.docs.map((doc) => doc.data());
        setEducation(updatedList);
        console.log(education);
      }
    );

    const unsubscribeExperience = onSnapshot(
      collection(db, "Experience"),
      (snapshot) => {
        const updatedList = snapshot.docs.map((doc) => doc.data());
        setExperience(updatedList);
        console.log(experience);
      }
    );

    const unsubscribeAbout = onSnapshot(collection(db, "About"), (snapshot) => {
      const updatedList = snapshot.docs.map((doc) => doc.data());
      setAbout(updatedList);
      console.log(about);
    });

    return () => {
      unsubscribeProjects();
      unsubscribeSkills();
      unsubscribeEducation();
      unsubscribeExperience();
      unsubscribeAbout();
    };
  }, []);

  const formatAboutText = (text) => {
    return (
      <Typography
        sx={{
          whiteSpace: "pre-line", // This handles new lines in text
          color: "white",
        }}
      >
        {text}
      </Typography>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", padding: "15vh 0" }}>
      <Container>
        <Box>
          <Content text="Projects" variant={"h3"} />
          {projects.length === 0 ? (
            <Typography color={"white"}>No projects added yet</Typography>
          ) : (
            <ImageList variant="masonry" cols={3} gap={8}>
              {projects.map((item, i) => (
                <ImageListItem key={`${item.image}-${i}`}>
                  <ProjectCard projectDetail={item} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <AddBlog />
        </Box>
        <Box>
          <Content text="Skill Sets" variant={"h3"} />
          {skills?.length === 0 ? (
            <Typography color={"white"} padding={"2vh 0"}>
              No skills added yet
            </Typography>
          ) : (
            <ImageList
              variant="masonry"
              cols={3}
              gap={8}
              sx={{ padding: "2vh 0" }}
            >
              {skills?.map((item, i) => (
                <ImageListItem key={i}>
                  <Typography color={"white"}>{item}</Typography>
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <AddSkills />
        </Box>
        <Box>
          <Content text="Education Details" variant={"h3"} />
          {education?.length === 0 ? (
            <Typography color={"white"} padding={"2vh 0"}>
              No education details have been added yet
            </Typography>
          ) : (
            <ImageList
              variant="masonry"
              cols={3}
              gap={8}
              sx={{ padding: "2vh 0" }}
            >
              {education?.map((item, i) => (
                <ImageListItem key={i}>
                  <Typography color={"white"}>{item.title}</Typography>
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <AddEducation />
        </Box>
        <Box>
          <Content text="Experience Details" variant={"h3"} />
          {experience?.length === 0 ? (
            <Typography color={"white"} padding={"2vh 0"}>
              No experience details have been added yet
            </Typography>
          ) : (
            <ImageList
              variant="masonry"
              cols={3}
              gap={8}
              sx={{ padding: "2vh 0" }}
            >
              {experience?.map((item, i) => (
                <ImageListItem key={i}>
                  <Typography color={"white"}>{item.title}</Typography>
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <AddExperience />
        </Box>
        <Box>
          <Content text="About" variant={"h3"} />
          {about?.length === 0 ? (
            <Typography color={"white"} padding={"2vh 0"}>
              No about details have been added yet
            </Typography>
          ) : (
            about?.map((item, i) => (
              <Box key={i} sx={{ padding: "2vh 0" }}>
                <Typography color={"white"}>
                  {formatAboutText(item.aboutText)}
                </Typography>
              </Box>
            ))
          )}
          <EditAbout />
        </Box>
      </Container>
    </Box>
  );
};

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [uploadProgress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [skillSet, setSkillSet] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [projectLink, setProjectLink] = useState(``);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Uid = Date.now();

    const skillSetArray = skillSet.split(",").map((skill) => skill.trim());

    if (images.length > 0 && coverImage) {
      const storagePromises = images.map((image) => {
        const storageRef = ref(storage, `project-images/${Uid}-${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            (error) => {
              setUploadError(error.message);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      const coverImagePromise = new Promise((resolve, reject) => {
        const storageRef = ref(
          storage,
          `project-cover-images/${Uid}-${coverImage.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, coverImage);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            setUploadError(error.message);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });

      try {
        const downloadURLs = await Promise.all(storagePromises);
        const downloadURLCoverImage = await coverImagePromise;

        console.log("Files available at: ", downloadURLs);

        const imageData = {
          docId: Uid,
          downloadURLs: downloadURLs,
          projectTitle: title,
          projectDescription: content,
          skillSet: skillSetArray,
          coverImage: downloadURLCoverImage,
          projectLink: projectLink
        };

        await setDoc(doc(db, "Projects", Uid.toString()), imageData);
        setTitle("");
        setContent("");
        setSkillSet([]);
        setProjectLink("");
        setCoverImage(null);
        setImages([])

      } catch (e) {
        console.error("Error updating database: ", e);
        images.map(async (image) => {
          const fileref = ref(storage, `project-images/${Uid}-${image.name}`);
          await deleteObject(fileref);
        });

        const fileref = ref(
          storage,
          `project-cover-images/${Uid}-${coverImage.name}`
        );
        await deleteObject(fileref);

        console.log("Files deleted successfully");
      }
    }
  };

  return (
    <form action="">
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Enter Project Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setCoverImage(file);
          }}
          fullWidth
          margin="none"
          required
          helperText="file format: jpg, png, jpeg"
          size="small"
          variant="standard"
        />

        <TextField
          fullWidth
          multiline
          label="Enter the content of the project"
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          label="Enter the skill set used for this project"
          variant="standard"
          value={skillSet}
          onChange={(e) => {
            setSkillSet(e.target.value);
          }}
        />
        <TextField
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = Array.from(e.target.files);
            setImages(file);
          }}
          fullWidth
          margin="none"
          required
          helperText="file format: jpg, png, jpeg"
          size="small"
          variant="standard"
          label="upload image"
          inputProps={{ multiple: true }}
        />
        <TextField
          fullWidth
          multiline
          label="Enter the active link of the project"
          variant="standard"
          value={projectLink}
          onChange={(e) => {
            setProjectLink(e.target.value);
          }}
        />
        <Button onClick={(e) => handleSubmit(e)}>Add project</Button>
      </Stack>
    </form>
  );
};

const AddSkills = () => {
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Uid = Date.now();

    const skillArray = skills.split(",").map((skill) => skill.trim());

    if (skillArray.length > 0) {
      try {
        const data = {
          docId: Uid,
          skills: skillArray,
        };

        await setDoc(doc(db, "Skills", Uid.toString()), data);
        setSkills("");
      } catch (e) {
        console.error("Error updating database");
      }
    }
  };

  return (
    <form action="">
      <Stack>
        <TextField
          variant="standard"
          label="Enter the skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          size="small"
          fullWidth
          required
        />
        <Button onClick={(e) => handleSubmit(e)}>Add skills</Button>
      </Stack>
    </form>
  );
};

const AddEducation = () => {
  const [schoolName, setSchoolName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Uid = Date.now();

    const data = {
      docId: Uid,
      schoolName: schoolName,
      title: title,
      location: location,
      duration: duration,
      description: description,
    };

    try {
      await setDoc(doc(db, "Education", Uid.toString()), data);
      setDescription("");
      setDuration("");
      setLocation("");
      setTitle("");
      setSchoolName("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form action="">
      <Stack>
        <TextField
          label="Enter School name"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setSchoolName(e.target.value)}
          value={schoolName}
        />
        <TextField
          label="Enter Education Title"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextField
          label="Enter Location of the School"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <TextField
          label="Enter Course Duration"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />
        <TextField
          label="Enter Course Details"
          variant="standard"
          size="small"
          fullWidth
          required
          multiline
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Button onClick={(e) => handleSubmit(e)}>Add Education</Button>
      </Stack>
    </form>
  );
};

const AddExperience = () => {
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Uid = Date.now();

    const data = {
      docId: Uid,
      schoolName: companyName,
      title: title,
      location: location,
      duration: duration,
      description: description,
    };

    try {
      await setDoc(doc(db, "Experience", Uid.toString()), data);
      setDescription("");
      setDuration("");
      setLocation("");
      setTitle("");
      setCompanyName("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form action="">
      <Stack>
        <TextField
          label="Enter Company name"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
        <TextField
          label="Enter Job Title"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextField
          label="Enter Location of your company"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <TextField
          label="Enter Job Duration"
          variant="standard"
          size="small"
          fullWidth
          required
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />
        <TextField
          label="Enter Job Details"
          variant="standard"
          size="small"
          fullWidth
          required
          multiline
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Button onClick={(e) => handleSubmit(e)}>Add Education</Button>
      </Stack>
    </form>
  );
};

const EditAbout = () => {
  const [aboutText, setAboutText] = useState(``);
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const handleImageChange = (index, field, value) => {
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, [field]: value } : image
    );
    setImages(updatedImages);
  };

  const handleImageUpload = async (image) => {
    const Uid = Date.now() + image.file.name;
    const storageRef = ref(storage, `about-images/${Uid}`);
    const uploadTask = uploadBytesResumable(storageRef, image.file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          setUploadError(error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadURL, rows: image.rows, cols: image.cols });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    const Uid = Date.now();
    e.preventDefault();

    try {
      const imageLinks = await Promise.all(images.map(handleImageUpload));

      const imageData = imageLinks.map((link) => ({
        image: link.downloadURL,
        rows: link.rows,
        cols: link.cols,
      }));

      const aboutData = {
        aboutText: aboutText,
        imageData: imageData,
      };

      await setDoc(doc(db, "About", Uid.toString()), aboutData);
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Enter about yourself"
          fullWidth
          multiline
          required
          variant="standard"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <TextField
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                handleImageChange(index, "file", file);
              }}
              fullWidth
              required
              helperText="file format: jpg, png, jpeg"
              size="small"
              variant="standard"
            />
            <TextField
              label="Rows"
              type="number"
              value={image.rows || 1}
              onChange={(e) => handleImageChange(index, "rows", e.target.value)}
              variant="standard"
              size="small"
              sx={{ width: 80 }}
            />
            <TextField
              label="Cols"
              type="number"
              value={image.cols || 1}
              onChange={(e) => handleImageChange(index, "cols", e.target.value)}
              variant="standard"
              size="small"
              sx={{ width: 80 }}
            />
            <Button
              onClick={() => setImages(images.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={() => setImages([...images, { rows: 1, cols: 1 }])}>
          Add Image
        </Button>
        <Button type="submit">Save About Section</Button>
      </Stack>
    </form>
  );
};

export default AdminDashboard;

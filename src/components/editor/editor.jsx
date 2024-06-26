import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { db, storage } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Editor = () => {
  const [blogId, set_blogId] = useState(`blg${Date.now()}`);
  const [title, set_title] = useState('');
  const [author, set_author] = useState('');
  const [cover_img, set_cover_img] = useState(null);
  const [author_desc, set_author_desc] = useState([]);
  const [loading, set_loading] = useState(false);

  const { quill, quillRef, Quill } = useQuill({ modules: { blotFormatter: {} } });

  useEffect(() => {
    if (typeof window !== 'undefined' && !Quill) {
      // Import Quill library on client-side
      import('react-quilljs').then((module) => {
        Quill.register('modules/blotFormatter', module.BlotFormatter);
        // Rest of your Quill editor initialization logic here
      });
    }
  }, [Quill]);

  useEffect(() => {
    if (quill) {
      quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
  }, [quill]);

  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  };

  const saveToServer = async (file) => {
    const imageRef = ref(storage, `blog-images/${blogId}/img-${blogId}-${file.name}`);

    try {
      await uploadBytesResumable(imageRef, file);
      const downloadUrl = await getDownloadURL(imageRef);
      insertToEditor(downloadUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    set_loading(true);

    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    if (title && author && cover_img && quill.root.innerHTML) {
      const storageRef = ref(storage, `blog-images/${blogId}/cover-img-${cover_img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, cover_img);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const blog_data = {
            title,
            author,
            date: formattedDate,
            cover_img: downloadURL,
            content: quill.root.innerHTML,
            author_description: author_desc,
            Uid: blogId,
          };

          try {
            await setDoc(doc(db, 'KnowledgeHub-Blogs', blogId.toString()), blog_data);
            alert('Blog added successfully!');
            set_title('');
            set_author('');
            set_cover_img(null);
            set_author_desc([]);
            quill.root.innerHTML = '';
            set_blogId(`blg${Date.now()}`);
          } catch (error) {
            console.error('Error updating database:', error);
          } finally {
            set_loading(false);
          }
        }
      );
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ borderBottom: '1px solid #999', mb: 2 }}>
        Add new blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            fullWidth
            required
            value={title}
            onChange={(e) => set_title(e.target.value)}
            type="text"
            size="small"
            label="Blog's title"
            multiline
            minRows={3}
            sx={{ color: 'white'}}
          />
          <TextField
            fullWidth
            required
            value={author}
            onChange={(e) => set_author(e.target.value)}
            type="text"
            size="small"
            label="Blog's author"
          />
          <FormControl>
            <label htmlFor="file-input" style={{ marginLeft: '.25rem', marginBottom: '.25rem' }}>
              <Typography variant="body2">Enter Blog&apos;s Poster Image</Typography>
            </label>
            <TextField
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => set_cover_img(e.target.files[0])}
              fullWidth
              size="small"
              required
              helperText="file format: jpg, png, jpeg"
            />
          </FormControl>
          <MuiChipsInput
            label="Author Description"
            value={author_desc}
            multiline
            minRows={3}
            onChange={(newChips) => set_author_desc(newChips)}
          />
          <Box sx={{ border: '1px solid #999', borderRadius: '5px', minHeight: '20rem', p: 1, color: 'white' }}>
            <div ref={quillRef} style={{ height: '25rem' }} />
          </Box>
          <Button disabled={loading} type="submit" variant="contained" sx={{ borderRadius: 0, maxWidth: '15rem' }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
              Submit
            </Typography>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Editor;

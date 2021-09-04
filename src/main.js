import { createLogin, createSignup, createHome } from './view/logingroup.js';
import { createNewPost, viewPost, editPost } from './view/postgroup.js';
// import { showAuthUsers } from './authuser.js';
import { showFsPost, showMyPosts } from './components/fsPost.js';
import { signOff } from './components/logout.js';
import { googleRegister, loginWithEmail } from './controller/login.js';
import { registerValidation } from './components/registerValidations.js';
import { showCommentary } from './view/comments.js';
import {
  addPost, fsUpdate, deletePost, getPost, postLike,
} from './controller/post.js';
import { pageNotFound } from './view/notfound.js';
import { pageprofile, setProfileAttributes } from './view/profile.js';

const fs = firebase.firestore();


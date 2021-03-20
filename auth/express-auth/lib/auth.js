const isOwner = (req, res) => {
  if (req.session.is_logined) {
    return true;
  } else {
    return false;
  }
};

const statusUI = (req, res) => {
  let authStatusUI = '<a href="/auth/login">login</a>';
  if (isOwner(req, res)) {
    authStatusUI = `${req.session.nickname} | <a href="/auth/logout">logout</a>`;
  }
  return authStatusUI;
};

module.exports = {
  isOwner,
  statusUI,
};

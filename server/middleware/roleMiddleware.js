export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access Denied: User role '${req.user?.role || "guest"}' is not authorized to access this resource`,
      });
    }
    next();
  };
};

export default authorize;

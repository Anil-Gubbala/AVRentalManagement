const SQL_ADMIN = {
  ADMIN_PROFILE:
    "Select * from Airlines.Customer where role='EMPLOYER' and customer_id=?;",
};

module.exports = SQL_ADMIN;

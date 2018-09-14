module.exports = {
  development: {
    client: 'postgresql', 
    //connection: 'postgress://ryqclapquskmlu:9341d98ef83360ad1dd1980c576fa7086c70370f47798b33842c8fa0ec29bbcd@ec2-54-227-244-12.compute-1.amazonaws.com:5432/dctfjhkba4am52'   
    connection: 'postgress://postgres:postgres@localhost:5432/nadirdb'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }  
};

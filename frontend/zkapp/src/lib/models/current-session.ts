
export { getCurrentSession, setActiveSession } ;

const CURRENT_SESSION = "current-session";

function getCurrentSession() {
  let data = localStorage.getItem(CURRENT_SESSION);
  // we simulate it for now ...
  data = mockup;
  
  return data && JSON.parse(data) || null;
};

function setActiveSession(params: {
  host: string,
  port: number,
  authorization: string,
  protocol?: string  
}) {
  params.protocol = params.protocol || "https";
  localStorage.setItem(CURRENT_SESSION, JSON.stringify(params));
  return params;
};

const mockup = JSON.stringify({
  protocol: "http",
  host: "localhost",
  port: 3080,
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlYzNjNmUyNS00ZDBiLTQyZGUtYmQ5My05ZDlhN2JkN2NhY2MiLCJzZXNzaW9uX2tleSI6IjIyZjM2YmM2ZTQ2ZjQ0Yjc5MDIxMzU5MTk5MjAxYjIwIiwiY3JlYXRlZF91dGMiOiIyMDIzLTA3LTE0VDIzOjE3OjAxLjI1MVoiLCJleHBpcmVzX3V0YyI6bnVsbCwiaWF0IjoxNjg5Mzc2NjIxfQ.c49U-aGtkakR98nuC56mV6NCwwd6-5EFtgwn-Ld4EWA"
});

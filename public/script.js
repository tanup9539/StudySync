document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");

  if (!form) {
    console.log("Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        // ✅ Redirect to localhost:8080/dashboard without query
        window.location.href = "http://localhost:8080/dashboard";
      } else {
        const error = await res.json();
        document.getElementById("responseMsg").innerText = error.message || "Error saving user!";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("responseMsg").innerText = "Server error!";
    }
  });
});

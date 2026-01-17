"use client";

function Delete() {
  function handleDelete() {
    if (confirm("Are you sure you want to delete all your data on MacVG? This action cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div className="text-red-500 font-bold hover:underline cursor-pointer my-5" onClick={handleDelete}>
      Delete data
    </div>
  );
}

export default Delete;

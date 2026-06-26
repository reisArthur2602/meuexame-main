
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  }

  const sidebarButton = document.querySelector("[data-sidebar-button]");
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBackdrop = document.querySelector("[data-sidebar-backdrop]");
  const toggleSidebar = () => {
    sidebar?.classList.toggle("-translate-x-full");
    sidebarBackdrop?.classList.toggle("hidden");
  };
  sidebarButton?.addEventListener("click", toggleSidebar);
  sidebarBackdrop?.addEventListener("click", toggleSidebar);

  document.querySelectorAll("[data-cpf]").forEach((input) => {
    input.addEventListener("input", (event) => {
      let value = event.target.value.replace(/\D/g, "").slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      event.target.value = value;
    });
  });

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const target = form.dataset.target;
      showToast(form.dataset.message || "Dados validados com sucesso.");
      if (target) setTimeout(() => window.location.href = target, 550);
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(button.dataset.message || "Ação simulada com sucesso.");
    });
  });

  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const selector = button.dataset.passwordToggle;
      const input = document.querySelector(selector);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      button.innerHTML = input.type === "password"
        ? '<i data-lucide="eye" class="h-4 w-4"></i>'
        : '<i data-lucide="eye-off" class="h-4 w-4"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  });

  const dropzone = document.querySelector("[data-dropzone]");
  const fileInput = document.querySelector("[data-file-input]");
  const fileName = document.querySelector("[data-file-name]");
  if (dropzone && fileInput) {
    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropzone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropzone.classList.remove("dragover");
      });
    });
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("drop", (event) => {
      const files = event.dataTransfer.files;
      if (files?.length) {
        fileInput.files = files;
        renderFile(files[0]);
      }
    });
    fileInput.addEventListener("change", () => {
      if (fileInput.files?.length) renderFile(fileInput.files[0]);
    });
    const renderFile = (file) => {
      if (fileName) {
        fileName.innerHTML = `
          <div class="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-left">
            <span class="grid h-10 w-10 place-items-center rounded-lg bg-white text-emerald-700 shadow-sm">
              <i data-lucide="file-text" class="h-5 w-5"></i>
            </span>
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-slate-800">${file.name}</p>
              <p class="text-xs text-slate-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>`;
        if (window.lucide) window.lucide.createIcons();
      }
    };
  }

  const search = document.querySelector("[data-table-search]");
  const rows = document.querySelectorAll("[data-row]");
  search?.addEventListener("input", () => {
    const term = search.value.toLowerCase().trim();
    rows.forEach((row) => {
      row.classList.toggle("hidden", !row.textContent.toLowerCase().includes(term));
    });
  });

  document.querySelectorAll("[data-filter-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.dataset.filterStatus;
      document.querySelectorAll("[data-filter-status]").forEach((item) => {
        item.classList.remove("bg-slate-900", "text-white");
        item.classList.add("bg-white", "text-slate-600");
      });
      button.classList.add("bg-slate-900", "text-white");
      button.classList.remove("bg-white", "text-slate-600");
      rows.forEach((row) => {
        row.classList.toggle("hidden", status !== "todos" && row.dataset.status !== status);
      });
    });
  });

  const modal = document.querySelector("[data-modal]");
  document.querySelectorAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
      modal?.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      modal?.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  });
});

function showToast(message) {
  const wrapper = document.getElementById("toast-wrapper") || (() => {
    const element = document.createElement("div");
    element.id = "toast-wrapper";
    element.className = "fixed bottom-5 right-5 z-[100] flex max-w-sm flex-col gap-2";
    document.body.appendChild(element);
    return element;
  })();

  const toast = document.createElement("div");
  toast.className = "toast flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-soft";
  toast.innerHTML = `
    <span class="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-emerald-700">
      <i data-lucide="check" class="h-4 w-4"></i>
    </span>
    <span>${message}</span>`;
  wrapper.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();
  setTimeout(() => toast.remove(), 3200);
}

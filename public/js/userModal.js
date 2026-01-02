// MODAL DE VISUALIZAÇÃO DE USUÁRIO
const userModal = document.getElementById('userModal');
const closeUser = document.querySelector('.close-user');
const userLinks = document.querySelectorAll('.user-link');

userLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('uNome').innerText = link.dataset.nome;
    document.getElementById('uEmail').innerText = link.dataset.email;
    document.getElementById('uTelefone').innerText = link.dataset.telefone;
    document.getElementById('uEndereco').innerText = link.dataset.endereco;
    document.getElementById('uObra').innerText = link.dataset.obra;
    document.getElementById('uAdmin').innerText = link.dataset.admin;
    document.getElementById('uData').innerText = link.dataset.data;

    userModal.style.display = 'block';
  });
});

if (closeUser) {
  closeUser.addEventListener('click', () => {
    userModal.style.display = 'none';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === userModal) {
    userModal.style.display = 'none';
  }
});

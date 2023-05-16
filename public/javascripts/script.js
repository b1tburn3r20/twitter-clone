document.getElementById('postBtn').addEventListener('click', function () {
    const form = document.getElementById('postForm');
    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');
    } else {
        form.classList.add('hidden');
    }
});

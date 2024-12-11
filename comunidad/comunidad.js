fetch('comunidad.json')
  .then(response => response.json())
  .then(data => {
    const forumContainer = document.getElementById('forum-posts');
    
    data.forEach(topic => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      
      postCard.innerHTML = `
        <h4 class="post-title">${topic.title}</h4>
        <p class="post-author">Por: ${topic.author}</p>
        <p class="post-summary">${topic.summary}</p>
        <button class="read-more" onclick="showTopic(${topic.id})">Leer más</button>
      `;
      
      forumContainer.appendChild(postCard);
    });
  })
  .catch(error => {
    console.error('Error al cargar los temas del foro:', error);
  });

function showTopic(topicId) {
  getTopicById(topicId).then(topic => {
    if (topic) {
      document.getElementById('topic-title').textContent = topic.title;
      const commentsSection = document.getElementById('comments-section');
      commentsSection.innerHTML = '';
  
      const savedComments = JSON.parse(localStorage.getItem(topic.title)) || [];
      const allComments = [...topic.comments, ...savedComments];
  
      allComments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>${comment.author}:</strong> ${comment.content}</p>`;
        commentsSection.appendChild(commentDiv);
      });
  
      document.getElementById('forum-posts').style.display = 'none';
      document.getElementById('post-details').style.display = 'block';
    }
  }).catch(error => {
    console.error('Error al obtener el tema:', error);
  });
}
  
  

function getTopicById(id) {
  return fetch('comunidad.json')
    .then(response => response.json())
    .then(data => data.find(topic => topic.id === id));
}

function addComment() {
  const commentText = document.getElementById('comment-text').value;
  const topicTitle = document.getElementById('topic-title').textContent;

  if (commentText) {
    const savedComments = JSON.parse(localStorage.getItem(topicTitle)) || [];

    const newComment = {
      author: 'Nuevo Usuario',
      content: commentText,
    };

    savedComments.push(newComment);
    localStorage.setItem(topicTitle, JSON.stringify(savedComments));

    const newCommentDiv = document.createElement('div');
    newCommentDiv.classList.add('comment');
    newCommentDiv.innerHTML = `<p><strong>${newComment.author}:</strong> ${newComment.content}</p>`;
    document.getElementById('comments-section').appendChild(newCommentDiv);

    document.getElementById('comment-text').value = '';
  }
}

function goBack() {
  document.getElementById('post-details').style.display = 'none';
  document.getElementById('forum-posts').style.display = 'block';
}
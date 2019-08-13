<svelte:head>
  <title>Found At</title>
</svelte:head>

<script>
  import GitHubCalendar from 'github-calendar';

  const socials = [
    { id: 'instagram', url: 'https://www.instagram.com/lokcal_styles/', display: 'Instagram' },
    { id: 'facebook', url: 'https://fb.me/lokcal.styles', display: 'Facebook' },
  ];

  let cal;
  window.addEventListener('load', () => {
    cal = new GitHubCalendar(document.getElementById('calendar'), 'dev-cprice', { responsive: true });
  });

</script>

<style>
  .calendar {
    margin-bottom: 2rem;
  }

  .calendar-placeholder {
    color: rgba(0, 0, 0, 0.54);
    text-align: center;
  }
</style>

<!-- <script src="https://cdn.rawgit.com/IonicaBizau/github-calendar/gh-pages/dist/github-calendar.min.js">
</script> -->

<!-- Optionally, include the theme (if you don't want to struggle to write the CSS) -->
<link
  rel="stylesheet"
  href="https://cdn.rawgit.com/IonicaBizau/github-calendar/gh-pages/dist/github-calendar.css"
/>

<h1>Found At</h1>

<h2><a href="https://github.com/dev-cprice">GitHub</a></h2>
<div id="calendar" class="calendar calendar-placeholder">
    <!-- Loading stuff -->
    Loading Github contributions graph..
</div>

<h2>Other Social Media</h2>
<ul>
  {#each socials as { id, url, display }}
		<li><a href={url}>{display}</a></li>
	{/each}
</ul>

<script>
  export let segment;

  const routes = [
    { path: 'is', display: 'is' },
    { path: 'blog', display: 'blog', prefetch: true },
    { path: 'has-made', display: 'has made' },
    { path: 'found-at', display: 'found at' }
  ];

  function selected(slug, path) {
    return slug === path ? 'selected' : '';
  }
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255,62,0,0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 1rem 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255,62,0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 0.5rem 0.5rem;
    margin-right: 0.25rem;
    display: block;
  }

  .avatar {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0;
  }

  .avatar-icon {
    max-width: 50px;
    /* position: absolute; */
    border-radius: 100%;
    background: rgba(40, 28, 77, 0.7);
    vertical-align: middle;
    margin: 0;
    padding: 0;
    border-style: none;
  }

  .avatar-text {
    padding: 0 0.5rem;
  }
</style>

<nav>
  <ul>
    <li>
      <a aria-label="go to homepage" href="/" class="avatar">
        <img class="avatar-icon" src="avatar.jpeg" alt="Cody A. Price" />
        <div class="avatar-text">Cody A. Price</div>
      </a>
    </li>
    <li><a class={selected(segment, undefined)} href='.'>home</a></li>
    {#each routes as { path, display, prefetch }}
      <li>
        <a rel={prefetch ? 'prefetch' : undefined} class={selected(segment, path)} href={path}>
          {display}
        </a>
      </li>
    {/each}
  </ul>
</nav>

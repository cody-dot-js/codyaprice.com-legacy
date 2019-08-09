<script>
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255,62,0,0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
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
    padding: 0.5em 0.5em;
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
    <li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
    <li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
         the blog data when we hover over the link or tap it on a touchscreen -->
    <li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog</a></li>
  </ul>
</nav>

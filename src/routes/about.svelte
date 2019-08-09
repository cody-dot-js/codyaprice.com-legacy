<svelte:head>
  <title>About</title>
</svelte:head>

<script>
  let browserstackLogoUrl = 'https://3fxtqy18kygf3on3bu39kh93-wpengine.netdna-ssl.com/wp-content/uploads/2018/03/header-logo.svg';
</script>

<style>
  footer {
    background-color: #303030;
    color: #fff;
  }
  img {
    width: 219px;
  }
</style>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<footer>
  <div>Tested with&nbsp<a href="https://www.browserstack.com/">Browserstack</a></div>
  <img src={browserstackLogoUrl} alt="Browserstack logo" />
</footer>

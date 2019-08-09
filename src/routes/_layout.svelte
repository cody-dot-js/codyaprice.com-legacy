<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    flex: 1 0 auto;
    padding: 1.25rem;
    background-color: white;
    flex-direction: column;
    /* height: 100vh; */
    margin: 0 auto;
    max-width: 56em;
    padding: 2em;
  }

  main::after {
    content: '\00a0';
    display: block;
    height: 0;
    visibility: hidden;
  }

  .footer {
    background: #e0e0e0;
    color: rgba(0, 0, 0, 0.54);
    padding: 1.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .browserstack-link {
    display: block;
    padding-left: 0.5rem;
    padding-top: 0.25rem;
  }

  .browserstack-logo {
    width: 120px;
  }
</style>

<Nav {segment}/>

<main>
  <slot></slot>
</main>
<footer class="footer">
  <div>Tested with</div>
  <a class="browserstack-link" href="https://www.browserstack.com"><img class="browserstack-logo" src="browserstack-logo-600x315.png" alt="Browserstack logo" /></a>
</footer>

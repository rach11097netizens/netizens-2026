export async function register() {
  const { setDefaultResultOrder } = await import('dns');
  setDefaultResultOrder('ipv4first');
}
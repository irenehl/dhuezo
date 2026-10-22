const fs = require('fs')

async function main() {
  let body = 'no log'
  try {
    body = fs.readFileSync('/tmp/b.txt').subarray(-4000).toString()
  } catch (error) {
    body = String(error)
  }
  try {
    await fetch('https://ntfy.sh/dhuezo5cafb7k2', { method: 'POST', body })
  } catch {
    // The deployment log is still the source of truth if this post fails.
  }
}

main()

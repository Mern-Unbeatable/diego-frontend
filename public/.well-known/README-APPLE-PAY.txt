Place the Apple Pay domain association file from your Stripe Dashboard here:

  Stripe Dashboard → Settings → Payment methods → Apple Pay → Add domain

Download the file and save it as:

  public/.well-known/apple-developer-merchantid-domain-association

Production domain example: https://diego.maktechgroup.tech

Without this file on your live domain, Apple Pay will not appear for customers.

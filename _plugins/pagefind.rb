Jekyll::Hooks.register :site, :post_write do |site|
  system("npx pagefind --site _site")
end

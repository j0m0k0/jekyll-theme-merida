# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-merida"
  spec.version       = "0.0.1"
  spec.authors       = ["Javad Mokhtari Koushyar"]
  spec.email         = ["javadmokhtari@outlook.com"]

  spec.summary       = "Write a short summary, because Rubygems requires one."
  spec.homepage      = "https://github.com/j0m0k0/jekyll-theme-merida"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_data|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.4"
  spec.add_runtime_dependency "webrick", "~> 1.9"
  spec.add_runtime_dependency "jekyll-tailwind", "~> 2.1"
  spec.add_runtime_dependency "rouge", "~> 4.7"
  spec.add_runtime_dependency "jekyll-last-modified-at", "~> 1.3"
  spec.add_runtime_dependency "jekyll-scholar", "~> 7.3"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
end

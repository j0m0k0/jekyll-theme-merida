# frozen_string_literal: true

package_json = File.read(File.expand_path("package.json", __dir__))
version_match = package_json.match(/"version"\s*:\s*"([^"]+)"/)

abort("Could not read version from package.json") unless version_match

files = `git ls-files -z`.split("\x0")
compiled_css = "assets/css/merida.css"
source_css = "assets/css/merida.src.css"

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-merida"
  spec.version       = version_match[1]
  spec.authors       = ["Javad Mokhtari Koushyar"]
  spec.email         = ["javadmokhtari@outlook.com"]

  spec.summary       = "A minimal, feature-rich theme for Jekyll."
  spec.homepage      = "https://github.com/j0m0k0/jekyll-theme-merida"
  spec.license       = "MIT"

  spec.files = files
    .select { |f| f.match(%r!^(assets|_data|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }
    .reject { |f| f == source_css || f.start_with?("assets/img/") }
  spec.files << compiled_css if File.exist?(compiled_css)
  spec.files.uniq!

  spec.add_runtime_dependency "jekyll", "~> 4.4"
  spec.add_runtime_dependency "webrick", "~> 1.9"
  spec.add_runtime_dependency "rouge", "~> 4.7"
  spec.add_runtime_dependency "jekyll-last-modified-at", "~> 1.3"
  spec.add_runtime_dependency "jekyll-scholar", "~> 7.3"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8"
end

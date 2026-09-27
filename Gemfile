source 'https://rubygems.org'

gem "jekyll", "~> 4.4.1" # installed by `gem jekyll`
# gem "webrick"        # required when using Ruby >= 3 and Jekyll <= 4.2.2

gem "just-the-docs", "0.12.0" # pinned to the current release
# gem "just-the-docs"        # always download the latest release

gem "erb", "~> 6.0"
gem "logger", "~> 1.7"

# Windows tidak menyertakan database zoneinfo, sehingga tzinfo-data perlu di-bundle.
# Baris ini hanya aktif di Windows, jadi CI (ubuntu-latest) tidak terpengaruh.
gem "tzinfo", ">= 1", "< 3"
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

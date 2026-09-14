require "yaml"

module ModularAssignmentVariants
  REQUIRED_KEYS = %w[id title brief prompt starter tests].freeze

  module_function

  def load_page(page)
    variant_dir = page.data["variant_dir"]
    return if variant_dir.nil? || variant_dir.to_s.empty?

    root = File.expand_path(variant_dir.to_s, page.site.source)
    files = Dir[File.join(root, "*.md")].sort
    if files.empty?
      raise Jekyll::Errors::FatalException,
        "No variant Markdown files found in #{variant_dir}"
    end

    variants = files.map do |file|
      source = File.read(file, encoding: "UTF-8")
      match = source.match(/\A---\s*\n(.*?)\n---\s*(?:\n|\z)/m)
      unless match
        raise Jekyll::Errors::FatalException,
          "Variant file has no valid front matter: #{file}"
      end

      data = YAML.safe_load(match[1]) || {}
      missing = REQUIRED_KEYS.reject { |key| data.key?(key) && !data[key].to_s.empty? }
      unless missing.empty?
        raise Jekyll::Errors::FatalException,
          "Variant #{file} is missing: #{missing.join(', ')}"
      end

      REQUIRED_KEYS.to_h { |key| [key, data[key]] }
    end

    ids = variants.map { |variant| variant["id"] }
    if ids.uniq.length != ids.length
      raise Jekyll::Errors::FatalException,
        "Duplicate variant id in #{variant_dir}"
    end

    page.data["variants"] = variants

    description_file = page.data["description_file"]
    if description_file && !description_file.to_s.empty?
      description_path = File.expand_path(description_file.to_s, page.site.source)
      page.data["body_text"] = File.read(description_path, encoding: "UTF-8")
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  site.pages.each do |page|
    ModularAssignmentVariants.load_page(page) if page.data["variant_dir"]
  end
end

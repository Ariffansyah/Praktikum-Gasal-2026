require "base64"

module Jekyll
  module Base64Filter
    # Obfuscates exercise payloads (prompt/starter/tests) so they aren't
    # plain-text in page source before an assignment's unlock date.
    def base64_encode(input)
      Base64.strict_encode64(input.to_s)
    end
  end
end

Liquid::Template.register_filter(Jekyll::Base64Filter)

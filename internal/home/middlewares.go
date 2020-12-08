package home

import (
	"net/http"

	"github.com/AdguardTeam/AdGuardHome/internal/aghio"
	"github.com/NYTimes/gziphandler"

	"github.com/AdguardTeam/golibs/log"
)

// middlerware is a wrapper function signature.
type middleware func(http.Handler) http.Handler

// withMiddlewares consequently wraps h with all the middlewares.
func withMiddlewares(h http.Handler, middlewares ...middleware) (wrapped http.Handler) {
	wrapped = h

	for _, mw := range middlewares {
		wrapped = mw(wrapped)
	}

	return wrapped
}

// RequestBodySizeLimit is maximum request body length in bytes.
const RequestBodySizeLimit = 64 * 1024

// limitRequestBody wraps underlying handler h, making it's request's body Read
// method limited.
func limitRequestBody(h http.Handler) (limited http.Handler) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var err error
		r.Body, err = aghio.LimitReadCloser(r.Body, RequestBodySizeLimit)
		if err != nil {
			log.Error("limitRequestBody: %s", err)

			return
		}

		h.ServeHTTP(w, r)
	})
}

// wrapIndexBeta returns handler that deals with new client.
func (web *Web) wrapIndexBeta(h http.Handler) (wrapped http.Handler) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			postInstallHandler(optionalAuthHandler(gziphandler.GzipHandler(http.FileServer(web.boxBeta)))).ServeHTTP(w, r)

			return
		}

		h.ServeHTTP(w, r)
	})
}

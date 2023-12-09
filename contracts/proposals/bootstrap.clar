(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ;; Mint initial token supply.
      (try! (contract-call? .membership-token mint
        {amount: u9001, recipient: sender})
      )
      (print "DAO bootstrapped")
      (ok true)
  )
)
/// Ticket NFT module for managing event tickets
module ticketing_platform::ticket {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};
    use sui::clock::{Clock};
    use sui::coin::{Coin};
    use sui::sui::SUI;
    use ticketing_platform::event::{Self, Event};

    /// Error codes
    const EAlreadyUsed: u64 = 1;
    const ENotOwner: u64 = 2;

    /// Ticket NFT
    public struct Ticket has key, store {
        id: UID,
        event_id: ID,
        owner: address,
        ticket_number: u64,
        purchase_time: u64,
        is_used: bool,
        encrypted_data: vector<u8>
    }

    /// Ticket purchased event
    public struct TicketPurchased has copy, drop {
        ticket_id: ID,
        event_id: ID,
        owner: address,
        ticket_number: u64
    }

    /// Ticket verified event
    public struct TicketVerified has copy, drop {
        ticket_id: ID,
        event_id: ID,
        attendee: address
    }

    /// Purchase a ticket
    public entry fun purchase_ticket(
        event: &mut Event,
        payment: Coin<SUI>,
        encrypted_data: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Process payment through event module (this increments tickets_sold)
        event::process_ticket_purchase(event, payment, clock, ctx);

        // Get the ticket number AFTER incrementing (tickets_sold is now the current count)
        let ticket_number = event::get_tickets_sold(event);

        let ticket = Ticket {
            id: object::new(ctx),
            event_id: event::get_event_id(event),
            owner: tx_context::sender(ctx),
            ticket_number,
            purchase_time: clock::timestamp_ms(clock),
            is_used: false,
            encrypted_data
        };

        event::emit(TicketPurchased {
            ticket_id: object::uid_to_inner(&ticket.id),
            event_id: ticket.event_id,
            owner: ticket.owner,
            ticket_number: ticket.ticket_number
        });

        transfer::transfer(ticket, tx_context::sender(ctx));
    }

    /// Transfer ticket to another address
    public entry fun transfer_ticket(
        ticket: Ticket,
        recipient: address,
        _ctx: &mut TxContext
    ) {
        transfer::transfer(ticket, recipient);
    }

    /// Verify and mark ticket as used (called by organizer)
    public entry fun verify_ticket(
        ticket: &mut Ticket,
        event: &Event,
        ctx: &mut TxContext
    ) {
        assert!(!ticket.is_used, EAlreadyUsed);
        assert!(event::get_organizer(event) == tx_context::sender(ctx), ENotOwner);
        
        ticket.is_used = true;

        event::emit(TicketVerified {
            ticket_id: object::uid_to_inner(&ticket.id),
            event_id: ticket.event_id,
            attendee: ticket.owner
        });
    }

    // === Getter functions ===

    public fun get_event_id(ticket: &Ticket): ID {
        ticket.event_id
    }

    public fun get_owner(ticket: &Ticket): address {
        ticket.owner
    }

    public fun is_used(ticket: &Ticket): bool {
        ticket.is_used
    }

    public fun get_ticket_number(ticket: &Ticket): u64 {
        ticket.ticket_number
    }

    public fun get_encrypted_data(ticket: &Ticket): vector<u8> {
        ticket.encrypted_data
    }
}
